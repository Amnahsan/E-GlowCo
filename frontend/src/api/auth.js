// frontend/src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/src/api/auth/'; // Ensure this points to the correct backend URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};
