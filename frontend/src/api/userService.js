import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export const userService = {
  getSellers: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/sellers`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}; 