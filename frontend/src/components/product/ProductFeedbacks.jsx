import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Rating, 
  Divider, 
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material';
import { getFeedbacksByProduct } from '../../api/feedback';
import FeedbackButton from '../feedback/customer/FeedbackButton';

const ITEMS_PER_PAGE = 5;

const ProductFeedbacks = () => {
  const { id: productId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [stats, setStats] = useState({
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [error, setError] = useState(null);

  const loadFeedbacks = useCallback(async () => {
    try {
      const data = await getFeedbacksByProduct(productId, {
        page,
        limit: ITEMS_PER_PAGE,
        sortBy
      });
      setFeedbacks(data.feedbacks);
      calculateStats(data.feedbacks);
      setError(null);
    } catch (error) {
      setError(error.message || 'Error loading feedbacks');
    } finally {
      setLoading(false);
    }
  }, [productId, page, sortBy]);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  const calculateStats = (data) => {
    const total = data.length;
    const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
    const distribution = data.reduce((acc, curr) => {
      acc[curr.rating] = (acc[curr.rating] || 0) + 1;
      return acc;
    }, {});

    setStats({
      average: total ? (sum / total).toFixed(1) : 0,
      total,
      distribution
    });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box className="py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="font-bold">
          Customer Reviews
        </Typography>
        <Box className="flex items-center gap-4">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="highest">Highest Rating</MenuItem>
              <MenuItem value="lowest">Lowest Rating</MenuItem>
            </Select>
          </FormControl>
          <FeedbackButton productId={productId} />
        </Box>
      </Box>

      {/* Stats Summary */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Box>
          <Box className="flex items-center gap-4">
            <Typography variant="h3">{stats.average}</Typography>
            <Box>
              <Rating value={Number(stats.average)} precision={0.5} readOnly />
              <Typography variant="body2" color="textSecondary">
                Based on {stats.total} reviews
              </Typography>
            </Box>
          </Box>
          
          {/* Rating Distribution */}
          <Box className="mt-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <Box key={rating} className="flex items-center gap-2 mb-1">
                <Typography variant="body2" className="w-8">
                  {rating}★
                </Typography>
                <Box className="flex-grow bg-gray-200 h-2 rounded-full">
                  <Box
                    className="bg-primary-600 h-full rounded-full"
                    style={{
                      width: `${(stats.distribution[rating] / stats.total) * 100}%`
                    }}
                  />
                </Box>
                <Typography variant="body2" className="w-12">
                  {stats.distribution[rating] || 0}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Reviews List */}
        <Box className="space-y-4">
          {feedbacks.map((feedback) => (
            <Box key={feedback._id}>
              <Box className="flex justify-between items-start">
                <Box>
                  <Rating value={feedback.rating} readOnly size="small" />
                  <Typography variant="body2" className="mt-1">
                    {feedback.comment}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" className="mt-2 block">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Divider className="my-4" />
            </Box>
          ))}

          {/* Pagination */}
          <Box className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil(stats.total / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFeedbacks; 