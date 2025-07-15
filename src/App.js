import React, { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import TaskManager from './components/TaskManager/TaskManager';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import './styles/App.css';
import './styles/Auth.css';
import './styles/TaskManager.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loggedInUser = getFromLocalStorage('loggedInUser');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    const theme = getFromLocalStorage('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    saveToLocalStorage('loggedInUser', userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    saveToLocalStorage('loggedInUser', userData);
  };

  const handleLogout = () => {
    setUser(null);
    removeFromLocalStorage('loggedInUser');
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    saveToLocalStorage('theme', newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '🌞' : '🌗'}
      </button>
      {user ? (
        <TaskManager onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;