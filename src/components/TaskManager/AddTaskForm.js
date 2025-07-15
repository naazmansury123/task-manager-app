import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  // ... (same as before)
`;

const Modal = styled.div`
  background: #4A4A4D;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  // ... other styles
`;

const AddTaskForm = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onAddTask({ title, description, priority });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <div>
            <button type="submit">Add Task</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </Modal>
    </ModalOverlay>
  );
};

export default AddTaskForm;