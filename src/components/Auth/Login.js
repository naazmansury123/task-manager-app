import React, { useState } from 'react';
import { getFromLocalStorage } from '../../utils/localStorage';
import { FormWrapper, Form, Title, Input, Button, ToggleText, ErrorText } from './SharedAuthStyles';

const Login = ({ onLogin, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getFromLocalStorage('user');
    if (user && user.email === email && user.password === password) {
      onLogin(user);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <FormWrapper>
      <Title>Welcome Back!</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit">Login</Button>
      </Form>
      <ToggleText>
        Don't have an account? <span onClick={toggleForm}>Register</span>
      </ToggleText>
    </FormWrapper>
  );
};

export default Login;