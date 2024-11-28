import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Person } from '@mui/icons-material';

const ChatList = ({ chats, selectedChat, onSelectChat }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isSeller = user?.role === 'seller';

  return (
    <Paper sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main' }}>
        <Typography variant="h6" color="white">
          Conversations
        </Typography>
      </Box>
      <List sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
        {chats.map((chat) => {
          const partner = isSeller ? chat.seller : chat.customer;
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <React.Fragment key={chat._id}>
              <ListItem
                button
                selected={selectedChat?._id === chat._id}
                onClick={() => onSelectChat(chat)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={partner?.name || 'Unknown User'}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '150px'
                        }}
                      >
                        {lastMessage?.content || 'No messages yet'}
                      </Typography>
                      {lastMessage && (
                        <Typography variant="caption" color="textSecondary">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default ChatList; 