import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  Chip,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { getUserFeedbacks } from '../../../api/feedback';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getUserFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      setError(error.message || 'Error loading feedbacks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-8">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="my-4">
        {error}
      </Alert>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <Box className="text-center py-8">
        <Typography variant="h6" color="textSecondary">
          You haven't submitted any feedback yet
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {feedbacks.map((feedback) => (
        <Grid item xs={12} key={feedback._id}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-start mb-4">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {feedback.productId?.name || 'Product No Longer Available'}
                  </Typography>
                  <Rating value={feedback.rating} readOnly />
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography variant="body1" className="mb-4">
                {feedback.comment}
              </Typography>

              {feedback.images?.length > 0 && (
                <Box className="flex gap-2 mb-4">
                  {feedback.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Feedback image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </Box>
              )}

              {feedback.response && (
                <Box className="bg-gray-50 p-4 rounded mt-4">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Seller Response:
                  </Typography>
                  <Typography variant="body2">
                    {feedback.response.response}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Responded on: {new Date(feedback.response.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              )}

              <Box className="flex gap-2 mt-4">
                <Chip 
                  size="small" 
                  label={feedback.status} 
                  color={feedback.status === 'Published' ? 'success' : 'default'}
                />
                {!feedback.productId && (
                  <Chip 
                    size="small" 
                    label="Product Deleted" 
                    color="error" 
                  />
                )}
                {feedback.response && (
                  <Chip 
                    size="small" 
                    label="Seller Responded" 
                    color="primary" 
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeedbackList; 