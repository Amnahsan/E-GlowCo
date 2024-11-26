import axios from 'axios';

const API_URL = 'http://localhost:3001/api/seller/products'; // Ensure this points to the correct backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch product list
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
    
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(API_URL, productData, config);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    
    // Make PUT request to update the product
    const response = await axios.put(`${API_URL}/${productId}`, productData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };
    const response = await axios.delete(`${API_URL}/${productId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}; 