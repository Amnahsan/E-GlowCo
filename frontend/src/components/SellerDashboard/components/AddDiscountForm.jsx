import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PercentIcon from '@mui/icons-material/Percent';

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

function AddDiscountForm({ open, handleClose, onSave, editDiscount = null }) {
  const initialFormState = {
    name: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editDiscount) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        name: editDiscount.name || '',
        description: editDiscount.description || '',
        discountPercentage: editDiscount.discountPercentage || '',
        startDate: formatDate(editDiscount.startDate) || '',
        endDate: formatDate(editDiscount.endDate) || '',
        status: editDiscount.status || 'Active'
      });
    }
  }, [editDiscount]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Discount name is required';
    }
    if (!formData.discountPercentage) {
      newErrors.discountPercentage = 'Percentage is required';
    } else if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Percentage must be between 0 and 100';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData(initialFormState);
      setErrors({});
      handleClose();
    }
  };

  const onCloseDialog = () => {
    setFormData(initialFormState);
    setErrors({});
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onCloseDialog}
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
        <Typography variant="h6" className="font-semibold">
          {editDiscount ? 'Edit Discount' : 'Create New Discount'}
        </Typography>
        <IconButton onClick={onCloseDialog} size="small" className="text-gray-500">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="p-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Discount Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  className="bg-white"
                  InputProps={{
                    className: "rounded-lg"
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  className="bg-white"
                  InputProps={{
                    className: "rounded-lg"
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Discount Percentage"
                  name="discountPercentage"
                  type="number"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  error={!!errors.discountPercentage}
                  helperText={errors.discountPercentage}
                  InputProps={{
                    startAdornment: <PercentIcon className="text-gray-400 mr-2" />,
                    className: "rounded-lg"
                  }}
                  className="bg-white"
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                    className="rounded-lg bg-white"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  InputProps={{
                    startAdornment: <CalendarTodayIcon className="text-gray-400 mr-2" />,
                    className: "rounded-lg"
                  }}
                  className="bg-white"
                  InputLabelProps={{ shrink: true }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                  InputProps={{
                    startAdornment: <CalendarTodayIcon className="text-gray-400 mr-2" />,
                    className: "rounded-lg"
                  }}
                  className="bg-white"
                  InputLabelProps={{ shrink: true }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="p-4 bg-gray-50 border-t">
          <Button 
            onClick={onCloseDialog}
            className="text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            {editDiscount ? 'Update' : 'Create'} Discount
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddDiscountForm;
