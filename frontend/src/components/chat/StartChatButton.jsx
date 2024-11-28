import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  CircularProgress
} from '@mui/material';
import { Person, Search } from '@mui/icons-material';
import { userService } from '../../api/userService';

const StartChatButton = ({ onStartChat }) => {
  const [open, setOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const data = await userService.getSellers();
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  const handleSelectSeller = (sellerId) => {
    onStartChat(sellerId);
    handleClose();
  };

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        fullWidth
        sx={{ mb: 2 }}
      >
        Start New Chat
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Select a Seller</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search sellers"
            type="text"
            fullWidth
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />
            }}
          />
          {loading ? (
            <CircularProgress sx={{ m: 2 }} />
          ) : (
            <List sx={{ mt: 2 }}>
              {filteredSellers.map((seller) => (
                <ListItem
                  button
                  key={seller._id}
                  onClick={() => handleSelectSeller(seller._id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={seller.name}
                    secondary={seller.email}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartChatButton; 