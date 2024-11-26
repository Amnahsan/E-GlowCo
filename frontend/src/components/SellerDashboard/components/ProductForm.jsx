import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  FormHelperText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadToCloudinary } from '../../../api/cloudinaryService';

function ProductForm({ open, handleClose, onSave, editProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    discount: '0',
    status: 'Active',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Face Makeup',
    'Eye Makeup', 
    'Lip Products',
    'Skincare',
    'Brushes & Tools',
    'Nail Care',
    'Fragrances',
    'Hair Care',
    'Makeup Sets',
    'Beauty Accessories'
  ];

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        description: editProduct.description || '',
        category: editProduct.category || '',
        price: editProduct.price || '',
        stock: editProduct.stock || '',
        discount: editProduct.discount || '0',
        status: editProduct.status || 'Active',
        images: editProduct.images || []
      });
      setErrors({});
    }
  }, [editProduct]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative integer';
    }

    if (Number(formData.discount) < 0 || Number(formData.discount) > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({
        ...prev,
        images: 'Some files were rejected. Please use JPEG, PNG or WebP images under 5MB.'
      }));
      return;
    }

    setIsUploading(true);
    
    try {
      const uploadPromises = validFiles.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, ...uploadedUrls]
      }));
      setErrors(prev => ({ ...prev, images: '' }));
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrors(prev => ({
        ...prev,
        images: 'Failed to upload images. Please try again.'
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: Number(formData.discount),
      status: formData.status,
      images: formData.images
    };

    onSave(productData);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      discount: '0',
      status: 'Active',
      images: []
    });
    setErrors({});
    handleClose();
  };

  const handleCloseWithReset = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      discount: '0',
      status: 'Active',
      images: []
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
      <DialogTitle>{editProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <DialogContent sx={{ overflowY: 'visible' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size="small"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small" error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                size="small"
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                size="small"
                error={!!errors.price}
                helperText={errors.price}
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                size="small"
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                size="small"
                error={!!errors.discount}
                helperText={errors.discount}
                inputProps={{ min: 0, max: 100, step: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <input
                accept="image/jpeg,image/png,image/webp"
                type="file"
                id="image-upload"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <Button 
                  variant="outlined" 
                  component="span" 
                  size="small"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Product Images'}
                </Button>
              </label>
              <FormHelperText error={!!errors.images}>{errors.images}</FormHelperText>
              
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {formData.images.map((imageUrl, index) => (
                  <Grid item key={index}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={imageUrl} 
                        alt={`Product ${index + 1}`} 
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseWithReset}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductForm;