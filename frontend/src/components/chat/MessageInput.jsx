import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  InputAdornment
} from '@mui/material';
import { Send, AttachFile, EmojiEmotions } from '@mui/icons-material';

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping(true);
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <IconButton size="small" color="primary" sx={{ width: 36, height: 36, borderRadius: '50%' }}>
        <AttachFile />
      </IconButton>
      <IconButton size="small" color="primary" sx={{ width: 36, height: 36, borderRadius: '50%' }}>
        <EmojiEmotions />
      </IconButton>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                type="submit" 
                color="primary"
                disabled={!message.trim()}
              >
                <Send />
              </IconButton>
            </InputAdornment>
          )
        }}
        onBlur={() => onTyping(false)}
      />
    </Paper>
  );
};

export default MessageInput; 