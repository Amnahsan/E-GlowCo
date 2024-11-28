import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Alert, CircularProgress, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import { 
  getUserFeedbacks,
  createFeedback,
  updateFeedback, 
  deleteFeedback 
} from '../../../api/feedback';
import { useParams } from 'react-router-dom';

const FeedbackPage = () => {
  const { productId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const data = await getUserFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      setError(error.message || 'Error fetching feedbacks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (feedbackData) => {
    try {
     // console.log('Submitting feedback:', feedbackData);
      
      if (editingFeedback) {
        const updatedFeedback = await updateFeedback(
          editingFeedback._id,
          feedbackData
        );
        setFeedbacks(feedbacks.map(f => 
          f._id === editingFeedback._id ? updatedFeedback : f
        ));
      } else {
        const newFeedback = await createFeedback(feedbackData);
        setFeedbacks([newFeedback, ...feedbacks]);
      }
      
      setShowForm(false);
      setEditingFeedback(null);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    setShowForm(true);
  };

  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteFeedback(feedbackId);
        setFeedbacks(feedbacks.filter(f => f._id !== feedbackId));
      } catch (error) {
        setError(error.message || 'Error deleting feedback');
      }
    }
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      <Container 
        maxWidth="lg" 
        className="py-4 px-2 sm:py-8 sm:px-4"
        sx={{
          width: '100%',
          maxWidth: '100%',
          '@media (min-width: 600px)': {
            maxWidth: '600px',
          },
          '@media (min-width: 960px)': {
            maxWidth: '960px',
          },
        }}
      >
        <Box className="flex justify-between items-center mb-4 sm:mb-8">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingFeedback(null);
              setShowForm(true);
            }}
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700"
            size="large"
          >
            Add Feedback
          </Button>
        </Box>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert 
                severity="error" 
                onClose={() => setError('')}
                className="mb-4"
              >
                {error}
              </Alert>
            </motion.div>
          )}

          {showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <FeedbackForm
                productId={productId || editingFeedback?.productId}
                initialData={editingFeedback}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingFeedback(null);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <FeedbackList
                feedbacks={feedbacks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Typography variant="h4" gutterBottom>
          My Feedbacks
        </Typography>
        <FeedbackList />
      </Container>
    </Box>
  );
};

export default FeedbackPage; 