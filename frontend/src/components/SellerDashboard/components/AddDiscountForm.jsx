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
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AddDiscountForm({ open, handleClose, onSave, editDiscount = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });
  

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
    } else {
      setFormData({
        name: '',
        description: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        status: 'Active'
      });
    }
  }, [editDiscount]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Discount name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Discount name must be at least 3 characters';
    }

    if (!formData.discountPercentage) {
      newErrors.discountPercentage = 'Discount percentage is required';
    } else if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (new Date(formData.startDate) && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
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
      const submissionData = {
        ...formData,
        discountPercentage: Number(formData.discountPercentage)
      };
      
      onSave(submissionData);
      handleClose();
    }
  };

  const handleCloseWithReset = () => {
    setFormData({
      name: '',
      description: '',
      discountPercentage: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
    setErrors({});
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseWithReset}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          m: 2
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h6">
          {editDiscount ? 'Edit Discount' : 'Create New Discount'}
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <DialogContent sx={{ overflowY: 'visible' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discount Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                size="small"
                error={!!errors.description}
                helperText={errors.description || 'Brief description of the discount'}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                  inputProps: { min: 0, max: 100 },
                  endAdornment: <Typography variant="body2" sx={{ ml: 1 }}>%</Typography>
                }}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                error={!!errors.startDate}
                helperText={errors.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                error={!!errors.endDate}
                helperText={errors.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={handleCloseWithReset} color="inherit">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            {editDiscount ? 'Update' : 'Create'} Discount
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddDiscountForm;
