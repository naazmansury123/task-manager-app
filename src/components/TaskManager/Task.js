import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Styled Components (No changes needed here) ---
const TaskWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: grab;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: ${(props) => `var(--priority-${props.priority})`};
  }
`;

const TaskContent = styled.div`
  flex-grow: 1;
`;

const TaskTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.1rem;
`;

const TaskDescription = styled.p`
  margin: 0;
  color: var(--color-subtle-text);
  font-size: 0.9rem;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
`;
// --- End of Styled Components ---


const Task = ({ task, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  // We are removing the editing state for simplicity with drag-and-drop
  // You can add it back if needed, but it complicates the UI
  return (
    <TaskWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      priority={task.priority}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <TaskContent>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
      </TaskContent>
      <TaskActions>
        {/* Edit functionality can be re-added here */}
        <ActionButton onClick={(e) => {
          e.stopPropagation(); // Prevent drag from starting on delete
          onDelete();
        }}>Delete</ActionButton>
      </TaskActions>
    </TaskWrapper>
  );
};

export default Task;