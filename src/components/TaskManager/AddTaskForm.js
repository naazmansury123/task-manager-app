// src/components/TaskManager/AddTaskForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--modal-overlay-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalWrapper = styled(motion.div)`
  background: var(--header-bg);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 25px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &.primary {
    background-color: var(--fab-bg);
    color: white;
  }

  &.secondary {
    background-color: #f1f3f4;
    color: var(--text-secondary);
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const AddTaskForm = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onAddTask({ title, description });
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel} // Close on clicking overlay
    >
      <ModalWrapper
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <ModalTitle>Add a New Task</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <ModalActions>
            <Button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="primary">
              Add Task
            </Button>
          </ModalActions>
        </Form>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default AddTaskForm;