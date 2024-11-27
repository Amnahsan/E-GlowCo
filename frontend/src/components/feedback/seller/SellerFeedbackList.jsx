import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Rating,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import { respondToFeedback } from '../../../api/feedback';

const ResponseDialog = ({ open, feedback, onClose, onSubmit }) => {
  const [response, setResponse] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setResponse('');
      setError('');
    }
  }, [open]);

  const handleSubmit = async () => {
    if (response.length < 10) {
      setError('Response must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(response);
      onClose();
    } catch (error) {
      setError(error.message || 'Error submitting response');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Respond to Feedback</DialogTitle>
      <DialogContent>
        <Box className="mb-4">
          <Typography variant="subtitle2" color="textSecondary">
            Customer Feedback:
          </Typography>
          <Typography>{feedback?.comment}</Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Response"
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
          disabled={isSubmitting}
        />
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
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ITEMS_PER_PAGE = 10;

const SellerFeedbackList = ({ feedbacks: allFeedbacks, onRefresh }) => {
  const [selectedFeedback, setSelectedFeedback] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('newest');
  
  // Sort and paginate feedbacks
  const sortedFeedbacks = React.useMemo(() => {
    let sorted = [...allFeedbacks];
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [allFeedbacks, sortBy]);

  const paginatedFeedbacks = React.useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sortedFeedbacks.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedFeedbacks, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleResponse = async (responseText) => {
    try {
     // console.log('Submitting response:', { feedbackId: selectedFeedback._id, response: responseText });
      await respondToFeedback(selectedFeedback._id, { response: responseText });
      onRefresh(); // Refresh the feedback list
    } catch (error) {
      console.error('Error submitting response:', error);
      throw error;
    }
  };

  return (
    <Box className="space-y-4">
      {/* Sorting Controls */}
      <Grid container justifyContent="space-between" alignItems="center" className="mb-4">
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Showing {paginatedFeedbacks.length} of {allFeedbacks.length} feedbacks
          </Typography>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="highest">Highest Rated</MenuItem>
              <MenuItem value="lowest">Lowest Rated</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Feedbacks List */}
      {paginatedFeedbacks.map((feedback) => (
        <Paper key={feedback._id} className="p-6">
          <Box className="flex justify-between items-start">
            <Box>
              <Typography variant="h6">
                {feedback.productId?.name || 'Product Deleted'}
              </Typography>
              <Box className="flex items-center space-x-2 mt-1">
                <Rating value={feedback.rating} readOnly size="small" />
                <Typography variant="caption" color="textSecondary">
                  {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" className="mt-1">
                By: {feedback.userId?.name || 'User Deleted'}
              </Typography>
            </Box>
            <Chip
              label={feedback.status}
              color={feedback.status === 'pending' ? 'warning' : 'success'}
              size="small"
            />
          </Box>

          <Typography className="mt-4">
            {feedback.comment}
          </Typography>

          {feedback.images && feedback.images.length > 0 && (
            <Box className="flex gap-4 mt-4">
              {feedback.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Feedback ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </Box>
          )}

          {feedback.status === 'pending' && (
            <Box className="mt-4">
              <Button
                variant="outlined"
                onClick={() => setSelectedFeedback(feedback)}
              >
                Respond
              </Button>
            </Box>
          )}

          {feedback.response && (
            <Box className="mt-4 bg-gray-50 p-4 rounded">
              <Typography variant="subtitle2" className="font-semibold">
                Your Response:
              </Typography>
              <Typography variant="body2" className="mt-1">
                {feedback.response.response}
              </Typography>
              <Typography variant="caption" color="textSecondary" className="mt-2 block">
                {new Date(feedback.response.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          )}
        </Paper>
      ))}

      {/* Pagination */}
      <Box className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(allFeedbacks.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Response Dialog */}
      <ResponseDialog
        open={!!selectedFeedback}
        feedback={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        onSubmit={handleResponse}
      />
    </Box>
  );
};

export default SellerFeedbackList; 