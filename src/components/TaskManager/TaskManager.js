import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Task from './Task'; // We will update this file next
import AddTaskForm from './AddTaskForm';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

// --- Styled Components (No changes needed here) ---
const TaskManagerWrapper = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h1 { font-size: 2.5rem; margin: 0; }
`;

const LogoutButton = styled.button`
  background: var(--color-secondary);
  color: var(--color-text);
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
  &:hover { background: var(--color-primary); }
`;

const TaskSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const TaskColumn = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 15px;
  min-height: 400px;
`;

const ColumnTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 600;
`;

const AddTaskButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(195, 7, 63, 0.4);
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.1); }
`;
// --- End of Styled Components ---

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState({ pending: [], completed: [] });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    const storedTasks = getFromLocalStorage('tasks') || { pending: [], completed: [] };
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const addTask = (taskData) => {
    const newTask = { id: `task-${Date.now()}`, ...taskData };
    setTasks((prev) => ({ ...prev, pending: [...prev.pending, newTask] }));
    setShowAddTaskForm(false);
  };
  
  const deleteTask = (id, status) => {
      setTasks(prev => ({
          ...prev,
          [status]: prev[status].filter(task => task.id !== id)
      }))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    
    if (activeContainer === overContainer) {
      // Reordering in the same column
      setTasks(prev => {
        const activeIndex = prev[activeContainer].findIndex(t => t.id === activeId);
        const overIndex = prev[overContainer].findIndex(t => t.id === overId);
        return {
          ...prev,
          [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
        };
      });
    } else {
      // Moving to a different column
      let movedTask;
      setTasks(prev => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.findIndex(t => t.id === activeId);
        movedTask = activeItems[activeIndex];

        const newActiveItems = activeItems.filter(t => t.id !== activeId);
        const newOverItems = [...overItems, movedTask];

        return {
          ...prev,
          [activeContainer]: newActiveItems,
          [overContainer]: newOverItems,
        };
      });
    }
  };

  return (
    <TaskManagerWrapper>
      <Header>
        <h1>Task Manager</h1>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </Header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <TaskSections>
          <TaskColumn>
            <ColumnTitle>Pending Tasks</ColumnTitle>
            <SortableContext items={tasks.pending} strategy={verticalListSortingStrategy}>
              <AnimatePresence>
                {tasks.pending.map(task => (
                  <Task key={task.id} task={task} onDelete={() => deleteTask(task.id, 'pending')} />
                ))}
              </AnimatePresence>
            </SortableContext>
          </TaskColumn>
          <TaskColumn>
            <ColumnTitle>Completed Tasks</ColumnTitle>
            <SortableContext items={tasks.completed} strategy={verticalListSortingStrategy}>
              <AnimatePresence>
                {tasks.completed.map(task => (
                  <Task key={task.id} task={task} onDelete={() => deleteTask(task.id, 'completed')} />
                ))}
              </AnimatePresence>
            </SortableContext>
          </TaskColumn>
        </TaskSections>
      </DndContext>

      <AddTaskButton onClick={() => setShowAddTaskForm(true)}>+</AddTaskButton>
      {showAddTaskForm && <AddTaskForm onAddTask={addTask} onCancel={() => setShowAddTaskForm(false)} />}
    </TaskManagerWrapper>
  );
};

export default TaskManager;