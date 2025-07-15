import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ onLogin, onRegister }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="auth-container">
      {showLogin ? (
        <Login onLogin={onLogin} toggleForm={toggleForm} />
      ) : (
        <Register onRegister={onRegister} toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Auth;