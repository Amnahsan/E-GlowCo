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
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Chip,
  Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { fetchDiscounts } from '../../../api/discountService';
import { applyDiscount, removeDiscount } from '../../../api/productService';

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.2 }
  }
};

function ApplyDiscountForm({ open, handleClose, onApply, onRemove, product }) {
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [activeDiscounts, setActiveDiscounts] = useState([]);

  useEffect(() => {
    loadDiscounts();
  }, []);

  useEffect(() => {
    if (product && product.discounts) {
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

  const handleSubmit = async () => {
    if (selectedDiscount) {
      try {
        await onApply(product._id, selectedDiscount);
        setSelectedDiscount('');
        handleClose();
      } catch (error) {
        console.error('Error applying discount:', error);
      }
    }
  };

  const handleRemoveDiscount = async (discountId) => {
    try {
      await onRemove(product._id, discountId);
    } catch (error) {
      console.error('Error removing discount:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: motion.div,
        variants: formVariants,
        initial: "hidden",
        animate: "visible",
        exit: "exit",
        className: "rounded-xl"
      }}
    >
      <DialogTitle className="flex justify-between items-center bg-gray-50 border-b">
        <Typography variant="h6" className="font-semibold inline-flex items-center">
          Manage Discounts - {product?.name}
        </Typography>
        <IconButton onClick={handleClose} size="small" className="text-gray-500 w-8 h-8">
          <CloseIcon fontSize="small"  />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-6">
        {activeDiscounts.length > 0 && (
          <>
            <Typography variant="subtitle1" className="font-medium mb-3">
              Active Discounts
            </Typography>
            <List className="bg-gray-50 rounded-lg mb-6">
              <AnimatePresence>
                {activeDiscounts.map((discount) => (
                  <motion.div
                    key={discount._id}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ListItem
                      className="hover:bg-gray-100 rounded-lg"
                      secondaryAction={
                        <Tooltip title="Remove Discount">
                          <IconButton 
                            edge="end"
                            onClick={() => handleRemoveDiscount(discount._id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box className="flex items-center gap-2">
                            <span className="font-medium">{discount.name}</span>
                            <Chip 
                              size="small"
                              icon={<PercentIcon className="text-primary-500" />}
                              label={`${discount.discountPercentage}% off`}
                              className="bg-primary-50 text-primary-700"
                            />
                          </Box>
                        }
                        secondary={
                          <Box className="flex items-center gap-1 mt-1 text-gray-500">
                            <CalendarTodayIcon fontSize="small" />
                            <span>Valid until {formatDate(discount.endDate)}</span>
                          </Box>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </>
        )}

        <Typography variant="subtitle1" className="font-medium mb-3">
          Add New Discount
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Select Discount</InputLabel>
          <Select
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
            label="Select Discount"
            className="rounded-lg bg-white"
          >
            {discounts.map((discount) => (
              <MenuItem key={discount._id} value={discount._id}>
                <Box className="py-1">
                  <Box className="flex items-center gap-2">
                    <Typography variant="subtitle2" className="font-medium">
                      {discount.name}
                    </Typography>
                    <Chip 
                      size="small"
                      label={`${discount.discountPercentage}%`}
                      className="bg-primary-50 text-primary-700"
                    />
                  </Box>
                  <Typography variant="caption" className="text-gray-500 block mt-1">
                    Valid until: {formatDate(discount.endDate)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions className="p-4 bg-gray-50 border-t">
        <Button 
          onClick={handleClose}
          className="text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedDiscount}
          className="bg-primary-600 hover:bg-primary-700 text-white disabled:bg-gray-300"
        >
          Apply Discount
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApplyDiscountForm; 