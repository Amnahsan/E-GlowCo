import axios from 'axios';

const API_URL = 'http://localhost:3001/api/seller/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const getCustomerOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/my-orders`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 