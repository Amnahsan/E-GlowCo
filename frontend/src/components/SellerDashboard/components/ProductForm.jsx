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
  Typography,
  Box,
  Tooltip,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { uploadToCloudinary } from '../../../api/cloudinaryService';

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

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

function ProductForm({ open, handleClose, onSave, editProduct }) {
  const initialFormState = {
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    images: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

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
        status: editProduct.status || 'Active',
        images: editProduct.images || []
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
    }
  }, [editProduct, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
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
    if (formData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadError('');
    
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setUploadError('Some files were rejected. Please use JPEG, PNG or WebP images under 5MB.');
      return;
    }

    setIsUploading(true);
    
    try {
      const uploadPromises = validFiles.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      setErrors(prev => ({ ...prev, images: '' }));
    } catch (error) {
      setUploadError('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      handleClose();
    }
  };

  const onCloseDialog = () => {
    setFormData(initialFormState);
    setErrors({});
    setUploadError('');
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onCloseDialog}
      maxWidth="md"
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
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </Typography >
        <IconButton onClick={onCloseDialog} size="small" className="text-gray-500  w-8 h-8">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="p-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Product Name"
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

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    className="rounded-lg bg-white"
                    startAdornment={<CategoryIcon className="text-gray-400 ml-2 mr-2" />}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <Typography variant="caption" color="error" className="mt-1">
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>
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
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  InputProps={{
                    startAdornment: <AttachMoneyIcon className="text-gray-400 mr-2" />,
                    className: "rounded-lg"
                  }}
                  className="bg-white"
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                  InputProps={{
                    startAdornment: <InventoryIcon className="text-gray-400 mr-2" />,
                    className: "rounded-lg"
                  }}
                  className="bg-white"
                />
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={inputVariants}>
                <Box className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    accept="image/jpeg,image/png,image/webp"
                    type="file"
                    id="image-upload"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      startIcon={<AddPhotoAlternateIcon />}
                      className="mb-2"
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Images'}
                    </Button>
                  </label>

                  {uploadError && (
                    <Alert severity="error" className="mb-2">
                      {uploadError}
                    </Alert>
                  )}

                  {errors.images && (
                    <Typography variant="caption" color="error">
                      {errors.images}
                    </Typography>
                  )}

                  <AnimatePresence>
                    <Grid container spacing={2} className="mt-2">
                      {formData.images.map((imageUrl, index) => (
                        <Grid item key={index}>
                          <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative"
                          >
                            <img 
                              src={imageUrl} 
                              alt={`Product ${index + 1}`} 
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 bg-white shadow-md hover:bg-red-50"
                            >
                              <DeleteIcon className="text-red-500 w-8 h-8" fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </AnimatePresence>
                </Box>
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
            {editProduct ? 'Update' : 'Create'} Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductForm;