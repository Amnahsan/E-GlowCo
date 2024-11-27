import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[600px] overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-image.jpg"
          alt="Beauty Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl text-white"
        >
          <Typography variant="h1" className="text-5xl md:text-6xl font-bold mb-4">
            Discover Your Natural Beauty
          </Typography>
          <Typography variant="h2" className="text-xl md:text-2xl mb-8">
            Premium skincare products for your daily beauty routine
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Shop Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection; 