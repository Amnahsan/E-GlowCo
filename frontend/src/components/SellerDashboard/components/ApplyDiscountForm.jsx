import React, { useState, useEffect } from 'react';
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
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDiscounts } from '../../../api/discountService';

function ApplyDiscountForm({ open, handleClose, onApply, onRemove, product }) {
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [activeDiscounts, setActiveDiscounts] = useState([]);

  useEffect(() => {
    loadDiscounts();
  }, []);

  useEffect(() => {
    if (product && product.discounts) {
      // Get full discount details for each discount ID
      const getActiveDiscounts = async () => {
        try {
          const data = await fetchDiscounts();
          const productDiscounts = data.filter(discount => 
            product.discounts.some(pd => pd.discount === discount._id)
          );
          setActiveDiscounts(productDiscounts);
        } catch (error) {
          console.error('Error loading active discounts:', error);
        }
      };
      getActiveDiscounts();
    }
  }, [product]);

  const loadDiscounts = async () => {
    try {
      const data = await fetchDiscounts();
      // Only show active discounts that aren't already applied to this product
      const availableDiscounts = data.filter(discount => 
        discount.status === 'Active' && 
        new Date(discount.endDate) > new Date() &&
        !product?.discounts?.some(pd => pd.discount === discount._id)
      );
      setDiscounts(availableDiscounts);
    } catch (error) {
      console.error('Error loading discounts:', error);
    }
  };

  const handleSubmit = () => {
    if (selectedDiscount) {
      onApply(product._id, selectedDiscount);
      setSelectedDiscount('');
      handleClose();
    }
  };

  const handleRemoveDiscount = (discountId) => {
    onRemove(product._id, discountId);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Discounts - {product?.name}</DialogTitle>
      <DialogContent>
        {activeDiscounts.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Active Discounts
            </Typography>
            <List>
              {activeDiscounts.map((discount) => (
                <ListItem
                  key={discount._id}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleRemoveDiscount(discount._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${discount.name} (${discount.discountPercentage}%)`}
                    secondary={`Valid until: ${new Date(discount.endDate).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Add New Discount
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Select Discount</InputLabel>
          <Select
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
            label="Select Discount"
          >
            {discounts.map((discount) => (
              <MenuItem key={discount._id} value={discount._id}>
                <Box>
                  <Typography variant="subtitle1">
                    {discount.name} ({discount.discountPercentage}%)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Valid until: {new Date(discount.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!selectedDiscount}
        >
          Add Discount
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApplyDiscountForm; 