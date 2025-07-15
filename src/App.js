// src/App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Auth from './components/Auth/Auth';
import TaskManager from './components/TaskManager/TaskManager';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from './utils/localStorage';

const AppContainer = styled.div`
  min-height: 100vh;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in from a previous session
    const loggedInUser = getFromLocalStorage('loggedInUser');
    if (loggedInUser) {
      setUser(loggedInUser);
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
    // Also clear tasks for the next user
    removeFromLocalStorage('tasks');
  };

  return (
    <AppContainer>
      {user ? (
        <TaskManager onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </AppContainer>
  );
}

export default App;