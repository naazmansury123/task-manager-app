// src/utils/localStorage.js

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Could not parse JSON from localStorage", error);
    return null;
  }
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};