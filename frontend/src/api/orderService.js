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

export const fetchOrders = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, {
      ...getAuthHeaders(),
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error.response?.data || error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error.response?.data || error;
  }
};

export const updateOrderStatus = async (orderId, status, comment) => {
  try {
    const response = await axios.put(
      `${API_URL}/${orderId}/status`,
      { status, comment },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error.response?.data || error;
  }
};

export const getOrderStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      console.error('Authentication error:', error.response.data);
    }
    throw error.response?.data || error;
  }
};

export const createOrder = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      { productId, quantity },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 