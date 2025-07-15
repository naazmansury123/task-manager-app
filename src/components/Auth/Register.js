import React, { useState } from 'react';
import { saveToLocalStorage } from '../../utils/localStorage';
import { FormWrapper, Form, Title, Input, Button, ToggleText } from './SharedAuthStyles';

const Register = ({ onRegister, toggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      const userData = { name, email, password };
      saveToLocalStorage('user', userData); // Save registration data
      onRegister(userData); // Log the user in
    }
  };

  return (
    <FormWrapper>
      <Title>Create Your Account</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Register</Button>
      </Form>
      <ToggleText>
        Already have an account? <span onClick={toggleForm}>Login</span>
      </ToggleText>
    </FormWrapper>
  );
};

export default Register;