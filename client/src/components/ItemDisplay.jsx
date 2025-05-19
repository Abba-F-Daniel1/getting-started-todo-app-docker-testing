import PropTypes from 'prop-types';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import './ItemDisplay.scss';

export function ItemDisplay({ item, onItemUpdate, onItemRemoval }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const toggleCompletion = () => {
    setIsLoading(true);
    fetch(`/api/items/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: item.name,
        completed: !item.completed,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        onItemUpdate(updatedItem);
        setIsLoading(false);
      });
  };

  const removeItem = () => {
    setIsLoading(true);
    fetch(`/api/items/${item.id}`, { method: 'DELETE' })
      .then(() => {
        onItemRemoval(item);
        setIsLoading(false);
      });
  };

  return (
    <Container 
      fluid 
      className={`item ${item.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Row className="align-items-center">
        <Col xs={2} sm={1} className="text-center">
          <Button
            className="toggle-btn"
            size="sm"
            variant="link"
            onClick={toggleCompletion}
            aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
            disabled={isLoading}
          >
            <div className={`checkbox ${item.completed ? 'checked' : ''}`}>
              {item.completed && <FontAwesomeIcon icon={faCheck} size="sm" />}
            </div>
          </Button>
        </Col>
        <Col xs={8} sm={9} className="item-name">
          {item.name}
        </Col>
        <Col xs={2} sm={2} className="text-end">
          <Button
            size="sm"
            variant="link"
            onClick={removeItem}
            className="remove-btn"
            aria-label="Remove Item"
            disabled={isLoading}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className={showActions ? 'visible' : ''}
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

ItemDisplay.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    completed: PropTypes.bool,
  }),
  onItemUpdate: PropTypes.func,
  onItemRemoval: PropTypes.func,
};