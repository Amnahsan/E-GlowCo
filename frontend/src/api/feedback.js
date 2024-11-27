import axios from 'axios';

const API_URL = 'http://localhost:3001/api/feedback';

// Create axios instance with auth header
const feedbackApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
feedbackApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Customer API calls
export const createFeedback = async (feedbackData) => {
  try {
    //console.log('Creating feedback with data:', feedbackData);
    
    if (!feedbackData.rating) {
      throw new Error('Rating is required');
    }
    if (!feedbackData.comment) {
      throw new Error('Comment is required');
    }

    const response = await feedbackApi.post('/', feedbackData);
    //console.log('Feedback creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createFeedback:', error);
    if (error.response) {
      //console.error('Server response:', error.response.data);
      throw error.response.data;
    }
    throw { message: error.message || 'Error creating feedback' };
  }
};

export const getUserFeedbacks = async () => {
  try {
    const response = await feedbackApi.get('/my-feedbacks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user feedbacks' };
  }
};

export const getFeedbackById = async (id) => {
  try {
    const response = await feedbackApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching feedback' };
  }
};

export const updateFeedback = async (id, updateData) => {
  try {
    const response = await feedbackApi.put(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating feedback' };
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await feedbackApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting feedback' };
  }
};

// Seller API calls
export const getSellerFeedbacks = async (filters = {}) => {
  try {
    const response = await feedbackApi.get('/seller/feedbacks', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching seller feedbacks' };
  }
};

export const respondToFeedback = async (feedbackId, responseData) => {
  try {
    //console.log('Responding to feedback:', { feedbackId, responseData });
    const response = await feedbackApi.post(`/${feedbackId}/response`, responseData);
    //console.log('Response submitted:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error responding to feedback:', error);
    if (error.response) {
      //console.error('Server response:', error.response.data);
      throw error.response.data;
    }
    throw { message: 'Error responding to feedback' };
  }
};

export const updateResponse = async (responseId, responseData) => {
  try {
    const response = await feedbackApi.put(`/response/${responseId}`, responseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating response' };
  }
};

// // Image upload helper
// export const uploadFeedbackImages = async (images) => {
//   try {
//     const formData = new FormData();
//     images.forEach((image, index) => {
//       formData.append('images', image);
//     });

//     const response = await feedbackApi.post('/upload-images', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data.imageUrls;
//   } catch (error) {
//     throw error.response?.data || { message: 'Error uploading images' };
//   }
// };

// Feedback statistics
export const getFeedbackStats = async () => {
  try {
    const response = await feedbackApi.get('/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching feedback statistics' };
  }
};

// // Custom hooks for common feedback operations
// export const useFeedbackOperations = () => {
//   const handleCreateFeedback = async (feedbackData) => {
//     try {
//       // If there are images, upload them first
//       if (feedbackData.images?.length > 0) {
//         const imageUrls = await uploadFeedbackImages(feedbackData.images);
//         feedbackData.images = imageUrls;
//       }
//       return await createFeedback(feedbackData);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleUpdateFeedback = async (id, updateData) => {
//     try {
//       // If there are new images, upload them first
//       if (updateData.newImages?.length > 0) {
//         const imageUrls = await uploadFeedbackImages(updateData.newImages);
//         updateData.images = [...(updateData.existingImages || []), ...imageUrls];
//         delete updateData.newImages;
//         delete updateData.existingImages;
//       }
//       return await updateFeedback(id, updateData);
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     handleCreateFeedback,
//     handleUpdateFeedback
//   };
// };

export const getFeedbacksByProduct = async (productId, options = {}) => {
  try {
    const { page = 1, limit = 5, sortBy = 'newest' } = options;
    const response = await feedbackApi.get(`/product/${productId}`, {
      params: {
        page,
        limit,
        sortBy
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching product feedbacks' };
  }
};

export const getProductFeedbackStats = async (productId) => {
  try {
    const response = await feedbackApi.get(`/product/${productId}/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching feedback stats' };
  }
};

export default feedbackApi; 