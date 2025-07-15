import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import Register from './Register';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const Auth = ({ onLogin, onRegister }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <AuthContainer>
      {showLogin ? (
        <Login onLogin={onLogin} toggleForm={toggleForm} />
      ) : (
        <Register onRegister={onRegister} toggleForm={toggleForm} />
      )}
    </AuthContainer>
  );
};

export default Auth;