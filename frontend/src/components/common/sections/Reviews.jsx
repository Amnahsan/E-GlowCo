import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Rating, 
  IconButton,
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/path/to/avatar1.jpg',
    rating: 5,
    comment: "I'm absolutely in love with their skincare products! My skin has never looked better, and the customer service is exceptional.",
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 2,
    name: 'Emily Davis',
    avatar: '/path/to/avatar2.jpg',
    rating: 5,
    comment: "The quality of their makeup products is outstanding. Everything from packaging to the product itself screams luxury.",
    date: '1 month ago',
    verified: true
  },
  {
    id: 3,
    name: 'Michelle Chen',
    avatar: '/path/to/avatar3.jpg',
    rating: 4,
    comment: "Great selection of natural products. I appreciate their commitment to clean beauty and sustainable practices.",
    date: '3 weeks ago',
    verified: true
  },
  // Add more reviews...
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const reviewVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3 }
  }
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  const nextReview = () => {
    setCurrentIndex((prev) => 
      prev + reviewsPerPage >= reviews.length ? 0 : prev + reviewsPerPage
    );
  };

  const prevReview = () => {
    setCurrentIndex((prev) => 
      prev - reviewsPerPage < 0 ? reviews.length - reviewsPerPage : prev - reviewsPerPage
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

  return (
    <Box className="py-20 bg-gray-50">
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Box className="text-center mb-12">
            <Typography 
              variant="h2" 
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Customers Say
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Read genuine reviews from our valued customers about their experience with our products and service.
            </Typography>
          </Box>

          <Box className="relative">
            <Box className="flex gap-6 mb-8">
              <AnimatePresence mode="wait">
                {visibleReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={reviewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1"
                  >
                    <Paper className="p-6 h-full rounded-xl hover:shadow-lg transition-shadow duration-300">
                      <Box className="flex items-start mb-4">
                        <Avatar
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12"
                        />
                        <Box className="ml-4 flex-grow">
                          <Typography variant="subtitle1" className="font-semibold">
                            {review.name}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" />
                        </Box>
                        <FormatQuoteIcon className="text-primary-200 text-4xl" />
                      </Box>

                      <Typography variant="body1" className="text-gray-600 mb-4">
                        "{review.comment}"
                      </Typography>

                      <Box className="flex justify-between items-center text-sm text-gray-500">
                        <Typography variant="caption">
                          {review.date}
                        </Typography>
                        {review.verified && (
                          <Typography variant="caption" className="text-green-600">
                            Verified Purchase
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Box className="flex justify-center gap-4">
              <IconButton 
                onClick={prevReview}
                className="bg-white hover:bg-gray-50 shadow-md"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton 
                onClick={nextReview}
                className="bg-white hover:bg-gray-50 shadow-md"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>

            {/* Review Stats */}
            <Box className="mt-12 flex justify-center gap-12">
              {[
                { label: 'Average Rating', value: '4.8/5' },
                { label: 'Total Reviews', value: '2,500+' },
                { label: 'Satisfied Customers', value: '98%' }
              ].map((stat) => (
                <Box key={stat.label} className="text-center">
                  <Typography variant="h4" className="font-bold text-primary-600">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Reviews; 