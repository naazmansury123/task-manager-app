// src/components/TaskManager/Task.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TaskWrapper = styled(motion.div)`
  background: var(--task-card-bg);
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TaskContent = styled.div`
  h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }
  p {
    margin: 0;
    color: var(--text-secondary);
    white-space: pre-wrap; /* Allows line breaks in description */
  }
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
`;

const ActionButton = styled.button`
  background: #f8f9fa;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  &:hover {
    border-color: #000;
    color: #000;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: var(--font-main);
    font-size: 1rem;
  }
  
  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const Task = ({ task, index, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <TaskWrapper
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {isEditing ? (
        <EditForm onSubmit={handleSave}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <TaskActions>
            <ActionButton type="submit">Save</ActionButton>
          </TaskActions>
        </EditForm>
      ) : (
        <>
          <TaskContent>
            <h3>#{index + 1}: {task.title}</h3>
            <p>{task.description}</p>
          </TaskContent>
          <TaskActions>
            <ActionButton onClick={() => setIsEditing(true)}>📝 Edit</ActionButton>
            {!task.completed && (
              <ActionButton onClick={() => onToggleComplete(task.id)}>✅ Mark as Completed</ActionButton>
            )}
            <ActionButton onClick={() => onDelete(task.id)}>❌ Delete</ActionButton>
          </TaskActions>
        </>
      )}
    </TaskWrapper>
  );
};

export default Task;