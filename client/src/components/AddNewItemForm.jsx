import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './AddNewItemForm.scss';

export function AddItemForm({ onNewItem }) {
  const [newItem, setNewItem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const submitNewItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    setSubmitting(true);

    fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify({ name: newItem }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((item) => {
        onNewItem(item);
        setSubmitting(false);
        setNewItem('');
      });
  };

  return (
    <Form onSubmit={submitNewItem} className="mb-4 add-item-form">
      <InputGroup 
        className={`add-item-input-group ${isFocused ? 'focused' : ''}`}
        size="lg"
      >
        <Form.Control
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="What needs to be done?"
          aria-label="New todo item"
          className="add-item-input"
          autoFocus
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!newItem.trim() || submitting}
          className="add-item-button"
        >
          {submitting ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          <span className="button-text">Add Task</span>
        </Button>
      </InputGroup>
    </Form>
  );
}

AddItemForm.propTypes = {
  onNewItem: PropTypes.func,
};