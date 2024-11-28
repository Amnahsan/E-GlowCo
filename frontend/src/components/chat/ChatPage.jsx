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
import SideNav from '../SellerDashboard/components/SideNav';

import { chatService } from '../../api/chatService';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import StartChatButton from './StartChatButton';

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const user = JSON.parse(localStorage.getItem('user'));
  const isSeller = user?.role === 'seller';

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

  const handleStartNewChat = async (partnerId) => {
    try {
      const newChat = await chatService.createChat(partnerId);
      setChats(prev => [...prev, newChat]);
      setSelectedChat(newChat);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={handleDrawerToggle} />
      
      {/* SideNav for both user types */}
      <SideNav 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle} 
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
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
                {!isSeller && <StartChatButton onStartChat={handleStartNewChat} />}
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
                    Select a chat to start messaging
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

export default ChatPage; 