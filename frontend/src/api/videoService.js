import axios from 'axios';

const API_URL = 'http://localhost:3001/api/seller/videos';

const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export const videoService = {
  getSellerVideos: async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  addVideo: async (videoData) => {
    try {
      const response = await axios.post(API_URL, videoData, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateVideo: async (id, videoData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, videoData, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteVideo: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getVideoAnalytics: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  trackVideoView: async (videoId, watchTime) => {
    try {
      const response = await axios.post(
        `${API_URL}/${videoId}/view`,
        { watchTime },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}; 