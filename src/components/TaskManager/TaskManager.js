// src/components/TaskManager/TaskManager.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const TaskManagerWrapper = styled.div`
  background-color: var(--bg-color);
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: var(--header-bg);
  box-shadow: 0 1px 3px var(--shadow-color);

  h1 {
    font-size: 1.8rem;
    margin: 0;
  }
`;

const LogoutButton = styled.button`
  background: var(--logout-bg);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const TaskSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
`;

const TaskColumn = styled.div`
  padding: 25px;
  border-radius: 15px;
  &.pending {
    background-color: var(--pending-bg);
  }
  &.completed {
    background-color: var(--completed-bg);
  }
`;

const ColumnTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 600;
  color: var(--text-primary);
`;

const AddTaskButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--fab-bg);
  color: white;
  border: none;
  font-size: 2.5rem;
  line-height: 1;
  padding-bottom: 5px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.05) rotate(15deg);
    box-shadow: 0 6px 16px rgba(26, 115, 232, 0.5);
  }
`;

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    setTasks(getFromLocalStorage('tasks') || []);
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    saveToLocalStorage('tasks', newTasks);
  };

  const addTask = (taskData) => {
    const newTask = { id: Date.now(), ...taskData, completed: false };
    saveTasks([...tasks, newTask]);
    setShowAddTaskForm(false);
  };

  const updateTask = (id, updatedData) => {
    saveTasks(tasks.map(t => (t.id === id ? { ...t, ...updatedData } : t)));
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    saveTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <TaskManagerWrapper>
      <Header>
        <h1>Task Manager</h1>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </Header>

      <TaskSections>
        <TaskColumn className="pending">
          <ColumnTitle>Pending Tasks</ColumnTitle>
          <TaskList tasks={pendingTasks} onUpdate={updateTask} onDelete={deleteTask} onToggleComplete={toggleComplete} />
        </TaskColumn>
        <TaskColumn className="completed">
          <ColumnTitle>Completed Tasks</ColumnTitle>
          <TaskList tasks={completedTasks} onUpdate={updateTask} onDelete={deleteTask} onToggleComplete={toggleComplete} />
        </TaskColumn>
      </TaskSections>

      <AddTaskButton onClick={() => setShowAddTaskForm(true)}>+</AddTaskButton>
      <AnimatePresence>
        {showAddTaskForm && <AddTaskForm onAddTask={addTask} onCancel={() => setShowAddTaskForm(false)} />}
      </AnimatePresence>
    </TaskManagerWrapper>
  );
};

export default TaskManager;