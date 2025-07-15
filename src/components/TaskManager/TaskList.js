import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, title, onUpdate, onDelete, onToggleComplete }) => {
  return (
    <div className="task-list-section">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;