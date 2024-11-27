import React from 'react';
import {
  Box,
  Typography,
  Rating,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeedbackItem = ({ feedback, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(feedback);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(feedback._id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'responded':
        return 'success';
      case 'resolved':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Paper className="p-3 sm:p-6 space-y-3 sm:space-y-4">
        <Box className="flex justify-between items-start">
          <Box>
            <Typography variant="h6" className="font-semibold">
              {feedback.productId?.name || 'Product Deleted'}
            </Typography>
            <Box className="flex items-center space-x-2 mt-1">
              <Rating value={feedback.rating} readOnly size="small" />
              <Typography variant="caption" color="textSecondary">
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center space-x-2">
            <Chip
              label={feedback.status}
              size="small"
              color={getStatusColor(feedback.status)}
            />
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <Edit fontSize="small" className="mr-2" /> Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <Delete fontSize="small" className="mr-2" /> Delete
            </MenuItem>
          </Menu>
        </Box>

        <Typography variant="body1">{feedback.comment}</Typography>

        {feedback.images && feedback.images.length > 0 && (
          <Box className="flex gap-4 mt-4">
            {feedback.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Feedback ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </Box>
        )}

        {feedback.response && (
          <Box className="mt-4 bg-gray-50 p-4 rounded">
            <Typography variant="subtitle2" className="font-semibold">
              Seller Response:
            </Typography>
            <Typography variant="body2" className="mt-1">
              {feedback.response.response}
            </Typography>
            <Typography variant="caption" color="textSecondary" className="mt-2 block">
              {new Date(feedback.response.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

const FeedbackList = ({ feedbacks, onEdit, onDelete }) => {
  return (
    <Box className="space-y-6">
      <Typography variant="h5" className="font-bold mb-6">
        Your Feedbacks
      </Typography>
      
      {feedbacks.length === 0 ? (
        <Typography color="textSecondary" className="text-center py-8">
          You haven't submitted any feedback yet.
        </Typography>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback._id}
            feedback={feedback}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </Box>
  );
};

export default FeedbackList; 