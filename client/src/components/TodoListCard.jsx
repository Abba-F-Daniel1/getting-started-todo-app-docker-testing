import { useCallback, useEffect, useState } from 'react';
import { AddItemForm } from './AddNewItemForm';
import { ItemDisplay } from './ItemDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './TodoListCard.scss';

export function TodoListCard() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format');
                }
                const data = await response.json();
                setItems(data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setError(error.message);
                setItems([]);
            }
        };

        fetchItems();
    }, []);

    const onNewItem = useCallback(
        (newItem) => {
            setItems([...items, newItem]);
        },
        [items],
    );

    const onItemUpdate = useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            setItems([
                ...items.slice(0, index),
                item,
                ...items.slice(index + 1),
            ]);
        },
        [items],
    );

    const onItemRemoval = useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
            setItems(newItems);
        },
        [items],
    );

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error loading items</h4>
                <p>{error}</p>
                <hr />
                <p className="mb-0">Please try refreshing or check your connection.</p>
            </div>
        );
    }

    if (items === null) {
        return (
            <div className="loading-container">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Loading your tasks...</p>
            </div>
        );
    }

    const completedItems = items.filter(item => item.completed);
    const todoItems = items.filter(item => !item.completed);

    return (
        <div className="todo-list">
            <AddItemForm onNewItem={onNewItem} />
            
            {items.length === 0 && (
                <div className="empty-state">
                    <FontAwesomeIcon icon={faListCheck} size="3x" />
                    <h3>No tasks yet</h3>
                    <p>Add your first task above to get started!</p>
                </div>
            )}
            
            {todoItems.length > 0 && (
                <div className="todo-section">
                    <h4 className="section-title">Tasks ({todoItems.length})</h4>
                    {todoItems.map((item) => (
                        <ItemDisplay
                            key={item.id}
                            item={item}
                            onItemUpdate={onItemUpdate}
                            onItemRemoval={onItemRemoval}
                        />
                    ))}
                </div>
            )}
            
            {completedItems.length > 0 && (
                <div className="completed-section">
                    <h4 className="section-title">Completed ({completedItems.length})</h4>
                    {completedItems.map((item) => (
                        <ItemDisplay
                            key={item.id}
                            item={item}
                            onItemUpdate={onItemUpdate}
                            onItemRemoval={onItemRemoval}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}