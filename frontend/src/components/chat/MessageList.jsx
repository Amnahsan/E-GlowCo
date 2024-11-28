import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const MessageList = ({ messages, currentUserId }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;
  
  return (
    <Box>
      {messages?.map((message, index) => {
        if (!message || !message.sender) {
          return null;
        }

        const isSentByMe = message.sender._id === currentUserId;
        const senderRole = isSentByMe ? userRole : (userRole === 'seller' ? 'user' : 'seller');

        return (
          <Box
            key={message._id || index}
            sx={{
              display: 'flex',
              justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
              mb: 2,
              position: 'relative'
            }}
          >
            <Paper
              elevation={2}
              sx={{
                maxWidth: '70%',
                p: 2,
                bgcolor: isSentByMe ? 'primary.main' : 'grey.100',
                color: isSentByMe ? 'white' : 'text.primary',
                borderRadius: 3,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  top: 'calc(50% - 10px)',
                  border: '10px solid transparent',
                  ...(isSentByMe
                    ? {
                        right: -18,
                        borderLeft: `10px solid ${isSentByMe ? '#1976d2' : '#f5f5f5'}`,
                      }
                    : {
                        left: -18,
                        borderRight: `10px solid ${isSentByMe ? '#1976d2' : '#f5f5f5'}`,
                      }),
                },
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
            >
              {/* Sender Name */}
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 'bold',
                    color: isSentByMe ? 'primary.light' : 'primary.main',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {message.sender.name || 'Unknown User'}
                </Typography>
              </Box>

              {/* Message Content */}
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  wordBreak: 'break-word'
                }}
              >
                {message.content || ''}
              </Typography>

              {/* Timestamp */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  textAlign: 'right',
                  color: isSentByMe ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                  fontSize: '0.75rem',
                  fontStyle: 'italic'
                }}
              >
                {message.timestamp ? 
                  formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }) : 
                  ''
                }
              </Typography>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageList; 