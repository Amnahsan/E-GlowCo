import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import { Person, MoreVert } from '@mui/icons-material';
import { chatService } from '../../api/chatService';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import socketService from '../../services/socketService';
import { debounceResizeObserver } from '../../utils/resizeObserver';

const ChatWindow = ({ chat, onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const partner = user.role === 'seller' ? chat.seller : chat.customer;

  useEffect(() => {
    console.log('Current chat:', chat);
    console.log('Current user:', user);
  }, [chat]);

  useEffect(() => {
    loadMessages();
  }, [chat._id]);

  useEffect(() => {
    const messageHandler = (message) => {
      console.log('Received message:', message);
      if (message.chatId === chat._id) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    };

    const typingHandler = (data) => {
      console.log('Typing event:', data);
      if (data.chatId === chat._id && data.userId !== user.userId) {
        setIsTyping(data.isTyping);
        setTimeout(() => setIsTyping(false), 3000);
      }
    };

    console.log('Setting up socket listeners for chat:', chat._id);
    const unsubscribeMessage = socketService.onMessage(messageHandler);
    const unsubscribeTyping = socketService.onTyping(typingHandler);

    return () => {
      console.log('Cleaning up socket listeners');
      unsubscribeMessage();
      unsubscribeTyping();
    };
  }, [chat._id, user.userId]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(debounceResizeObserver);
    const messageArea = document.querySelector('.message-area');
    
    if (messageArea) {
      resizeObserver.observe(messageArea);
    }

    return () => {
      if (messageArea) {
        resizeObserver.unobserve(messageArea);
      }
    };
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      console.log('Loading messages for chat:', chat._id);
      const data = await chatService.getMessages(chat._id);
      console.log('Loaded messages:', data);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error('Error loading messages:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    try {
      console.log('Sending message:', { chatId: chat._id, content });
      const newMessage = await chatService.sendMessage(chat._id, content);
      console.log('Message sent, response:', newMessage);
      
      // Emit to socket
      socketService.sendMessage(chat._id, newMessage);
      
      // Update local state
      setMessages(prev => {
        console.log('Previous messages:', prev);
        console.log('Adding new message:', newMessage);
        return [...prev, newMessage];
      });
      
      scrollToBottom();
      if (onNewMessage) onNewMessage();
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
    }
  };

  const handleTyping = (isTyping) => {
    socketService.sendTyping(chat._id, isTyping);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Paper 
      sx={{ 
        height: 'calc(100vh - 180px)', // Fixed height
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden' // Prevent outer scrolling
      }}
    >
      {/* Chat Header - Fixed */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          flexShrink: 0 // Prevent header from shrinking
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>
            <Person />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {partner?.name || 'Unknown User'}
            </Typography>
            <Typography variant="caption">
              {partner?.email}
            </Typography>
          </Box>
          <IconButton color="inherit" sx={{ width: 40, height: 40 }}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      {/* Messages Area - Scrollable */}
      <Box 
        className="message-area"
        sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <MessageList 
            messages={messages} 
            currentUserId={user.userId}
          />
        )}
        <div ref={messagesEndRef} />
        {isTyping && (
          <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
            <Typography variant="caption" color="textSecondary">
              {partner?.name} is typing...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Message Input - Fixed at bottom */}
      <Divider />
      <Box sx={{ p: 2, bgcolor: 'background.paper', flexShrink: 0 }}>
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onTyping={handleTyping}
        />
      </Box>
    </Paper>
  );
};

export default ChatWindow; 