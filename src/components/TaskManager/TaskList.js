// src/components/TaskManager/TaskList.js
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Task from './Task';

const TaskList = ({ tasks, onUpdate, onDelete, onToggleComplete }) => {
  return (
    <div>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;