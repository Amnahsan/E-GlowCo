import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import TopBar from '../SellerDashboard/components/TopBar';

import { chatService } from '../../api/chatService';
import ChatList from '../chat/ChatList';
import ChatWindow from '../chat/ChatWindow';
import StartChatButton from '../chat/StartChatButton';

const CustomerChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const data = await chatService.getChats();
      setChats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStartNewChat = async (sellerId) => {
    try {
      const newChat = await chatService.createChat(sellerId);
      setChats(prev => [...prev, newChat]);
      setSelectedChat(newChat);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px'
        }}
      >
        {loading ? (
          <Box className="flex justify-center items-center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={2} sx={{ height: 'calc(100vh - 100px)' }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <StartChatButton onStartChat={handleStartNewChat} />
                <ChatList
                  chats={chats}
                  selectedChat={selectedChat}
                  onSelectChat={setSelectedChat}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {selectedChat ? (
                <ChatWindow 
                  chat={selectedChat}
                  onNewMessage={() => loadChats()}
                />
              ) : (
                <Paper 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Select a chat or start a new conversation with a seller
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CustomerChatPage;