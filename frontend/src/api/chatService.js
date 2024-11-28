import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chat';

const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export const chatService = {
  getChats: async () => {
    try {
      console.log('Fetching chats...');
      const response = await axios.get(API_URL, getAuthHeaders());
      console.log('Fetched chats:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error.response?.data || error;
    }
  },
  
  getMessages: async (chatId) => {
    try {
      console.log('Fetching messages for chat:', chatId);
      const response = await axios.get(`${API_URL}/${chatId}/messages`, getAuthHeaders());
      console.log('Fetched messages:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error.response?.data || error;
    }
  },
  
  sendMessage: async (chatId, content) => {
    try {
      console.log('Sending message:', { chatId, content });
      const response = await axios.post(
        `${API_URL}/${chatId}/messages`, 
        { content },
        getAuthHeaders()
      );
      console.log('Message sent, response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error.response?.data || error;
    }
  },

  createChat: async (customerId) => {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        { customerId },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}; 