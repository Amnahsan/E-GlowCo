// src/components/NotFound.js
import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <ErrorOutlineIcon 
            className="text-primary-600 mb-4"
            sx={{ fontSize: '6rem' }}
          />
          <Typography 
            variant="h1" 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            404
          </Typography>
          <Typography 
            variant="h2" 
            className="text-xl md:text-2xl font-semibold text-gray-700 mb-2"
          >
            Page Not Found
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600 max-w-md mx-auto mb-8"
          >
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </Button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 text-gray-500"
        >
          <Typography variant="body2">
            If you believe this is a mistake, please contact support.
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default NotFound;
