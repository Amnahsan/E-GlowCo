import axios from 'axios';

const API_URL = 'http://localhost:3001/api/seller/discounts';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const fetchDiscounts = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching discounts:', error.response?.data || error.message);
    throw error;
  }
};

export const addDiscount = async (discountData) => {
  try {
    const response = await axios.post(API_URL, discountData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error adding discount:', error.response?.data || error.message);
    throw error;
  }
};

export const updateDiscount = async (id, discountData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, discountData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating discount:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteDiscount = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting discount:', error.response?.data || error.message);
    throw error;
  }
};
