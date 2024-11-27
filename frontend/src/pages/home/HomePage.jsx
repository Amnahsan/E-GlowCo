import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import Header from '../../components/common/layout/Header';
import HeroSection from '../../components/common/sections/HeroSection';
import FeaturedProducts from '../../components/common/sections/FeaturedProducts';
import Categories from '../../components/common/sections/Categories';
import Promotions from '../../components/common/sections/Promotions';
import Reviews from '../../components/common/sections/Reviews';
import Newsletter from '../../components/common/sections/Newsletter';
import AboutBrand from '../../components/common/sections/AboutBrand';
import SocialFeed from '../../components/common/sections/SocialFeed';
import Footer from '../../components/common/layout/Footer';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const HomePage = () => {
  return (
    <Box className="min-h-screen bg-gray-50">
      <Header />
      
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="pt-16" // Add padding top to account for fixed header
      >
        <HeroSection />
        
        <Box className="max-w-7xl mx-auto px-4">
          <FeaturedProducts />
          <Categories />
          <Promotions />
          <Reviews />
          <AboutBrand />
          <Newsletter />
          <SocialFeed />
        </Box>
      </motion.main>

      <Footer />
    </Box>
  );
};

export default HomePage; 