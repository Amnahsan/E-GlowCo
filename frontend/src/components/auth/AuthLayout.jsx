import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
  return (
    <Box className="min-h-screen bg-gray-50">
      {/* Header */}
      <Box className="bg-white shadow-sm py-4">
        <Container maxWidth="lg" className="px-4">
          <Box className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.img
                src="/images/logo.jpeg"
                alt="SAM E-GlowCo"
                className="h-8 md:h-10 rounded-full transform hover:scale-110 transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
              />
              <Typography variant="h6" className="text-primary-600 font-bold hidden sm:block">
                SAM E-GlowCo
              </Typography>
            </Link>
            
            <Box className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
              <Link to="/register" className="text-gray-600 hover:text-primary-600">Register</Link>
              <Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="sm" 
        className="py-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="bg-white rounded-lg shadow-lg p-8">
            <Typography variant="h4" className="text-center mb-8 font-bold text-gray-800">
              {title}
            </Typography>
            {children}
          </Box>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box className="bg-gray-900 text-white py-6">
        <Container maxWidth="lg" className="px-4">
          <Box className="flex flex-col md:flex-row justify-between items-center text-sm">
            <Typography variant="body2" className="text-gray-400">
              © 2024 SAM E-GlowCo. All Rights Reserved.
            </Typography>
            <Box className="flex mt-4 md:mt-0 text-gray-400">
              <Typography variant="body2" className="text-center">
                Created by: Samra Saleem | Muskan Tariq | Amna Hassan
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout; 