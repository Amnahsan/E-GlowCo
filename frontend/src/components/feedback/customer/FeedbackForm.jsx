import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Alert,
  IconButton,
  Paper,
  CircularProgress
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { uploadFeedbackImage } from '../../../api/cloudinaryService';

const FeedbackForm = ({ productId, initialData, onSubmit, onCancel }) => {
//  console.log('FeedbackForm props:', { productId, initialData });

  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || '');
  const [images, setImages] = useState(initialData?.images || []);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 3) {
      setError('Maximum 3 images allowed');
      return;
    }

    setUploadingImages(true);
    setError('');

    try {
      const uploadPromises = files.map(file => uploadFeedbackImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      setError('Error uploading images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (comment.length < 10) {
      setError('Comment must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        rating,
        comment,
        images
      };
      if (productId) {
        feedbackData.productId = productId;
      }
      
      //console.log('Submitting feedback:', feedbackData);
      await onSubmit(feedbackData);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message || 'Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper className="p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6"
      >
        <Typography variant="h6" className="font-semibold text-lg sm:text-xl">
          Write Your Feedback
        </Typography>

        <Box className="flex flex-col items-center space-y-2">
          <Typography component="legend">Your Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
              setError('');
            }}
            size="large"
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError('');
          }}
          error={comment.length > 0 && comment.length < 10}
          helperText={
            comment.length > 0 && comment.length < 10
              ? 'Comment must be at least 10 characters long'
              : ''
          }
        />

        <Box className="space-y-4">
          <Box className="flex items-center space-x-4">
            <Button
              component="label"
              variant="outlined"
              startIcon={uploadingImages ? <CircularProgress size={20} /> : <PhotoCamera />}
              disabled={images.length >= 3 || isSubmitting || uploadingImages}
            >
              {uploadingImages ? 'Uploading...' : 'Add Photos'}
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={images.length >= 3 || isSubmitting || uploadingImages}
              />
            </Button>
            <Typography variant="caption" color="textSecondary">
              Max 3 images
            </Typography>
          </Box>

          <Box className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <Box
                key={index}
                className="relative"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <IconButton
                  size="small"
                  className="absolute -top-2 -right-2 bg-white shadow-md"
                  onClick={() => removeImage(index)}
                  disabled={isSubmitting}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>

        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Box className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            fullWidth
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            className="sm:w-auto bg-primary-600 hover:bg-primary-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </Box>
      </motion.form>
    </Paper>
  );
};

export default FeedbackForm; 