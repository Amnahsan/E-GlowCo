import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
  Chip
} from '@mui/material';

const statusOptions = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

const UpdateOrderStatusDialog = ({ open, order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order?.status || 'Pending');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onUpdate(order.orderId, status, comment);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent>
        <Box className="space-y-4">
          {/* Order Details */}
          <Box className="bg-gray-50 p-4 rounded">
            <Typography variant="subtitle2" color="textSecondary">
              Order ID: {order.orderId}
            </Typography>
            <Typography variant="body2">
              Customer: {order.customerId.name}
            </Typography>
            <Typography variant="body2">
              Amount: ${order.totalAmount.toFixed(2)}
            </Typography>
          </Box>

          {/* Status Selection */}
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Comment Field */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a note about this status update..."
          />

          {/* Status History */}
          {order.trackingInfo?.updates?.length > 0 && (
            <Box>
              <Typography variant="subtitle2" className="mb-2">
                Status History
              </Typography>
              <Box className="space-y-2">
                {order.trackingInfo.updates.map((update, index) => (
                  <Box key={index} className="bg-gray-50 p-2 rounded">
                    <Box className="flex justify-between items-center">
                      <Chip 
                        label={update.status} 
                        size="small" 
                        className="mb-1"
                      />
                      <Typography variant="caption" color="textSecondary">
                        {new Date(update.date).toLocaleString()}
                      </Typography>
                    </Box>
                    {update.comment && (
                      <Typography variant="body2">
                        {update.comment}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderStatusDialog; 