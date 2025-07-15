// src/components/Auth/SharedAuthStyles.js
import styled from 'styled-components';

export const FormWrapper = styled.div`
  background: var(--header-bg);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px var(--shadow-color);
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.8rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: var(--fab-bg);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--fab-bg);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

export const ToggleText = styled.p`
  margin-top: 20px;
  color: var(--text-secondary);
  span {
    color: var(--fab-bg);
    font-weight: 500;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.p`
  color: var(--logout-bg);
  margin-bottom: 15px;
  font-weight: 500;
`;