import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    const storedTasks = getFromLocalStorage('tasks') || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setShowAddTaskForm(false);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-manager">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>
      <div className="task-sections">
        <div className="pending-tasks">
          <TaskList
            tasks={pendingTasks}
            title="Pending Tasks"
            onUpdate={updateTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
        <div className="completed-tasks">
          <TaskList
            tasks={completedTasks}
            title="Completed Tasks"
            onUpdate={updateTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
      </div>
      <button
        className="add-task-btn"
        onClick={() => setShowAddTaskForm(true)}
      >
        + Add Task
      </button>
      {showAddTaskForm && (
        <AddTaskForm
          onAddTask={addTask}
          onCancel={() => setShowAddTaskForm(false)}
        />
      )}
    </div>
  );
};

export default TaskManager;