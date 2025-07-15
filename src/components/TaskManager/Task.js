import React, { useState } from 'react';

const Task = ({ task, index, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <div className="task-info">
            <h3>
              #{index + 1}: {task.title}
            </h3>
            <p>{task.description}</p>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>📝 Edit</button>
            {!task.completed && (
              <button onClick={() => onToggleComplete(task.id)}>
                ✅ Mark as Completed
              </button>
            )}
            <button onClick={() => onDelete(task.id)}>❌ Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;