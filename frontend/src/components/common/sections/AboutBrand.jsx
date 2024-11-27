import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SpaIcon from '@mui/icons-material/Spa';
import SecurityIcon from '@mui/icons-material/Security';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const features = [
  {
    icon: <VerifiedIcon className="text-4xl text-primary-600" />,
    title: 'Premium Quality',
    description: 'Carefully curated selection of high-quality beauty products'
  },
  {
    icon: <SpaIcon className="text-4xl text-primary-600" />,
    title: 'Natural Ingredients',
    description: 'Products made with natural and organic ingredients'
  },
  {
    icon: <LocalShippingIcon className="text-4xl text-primary-600" />,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to your doorstep'
  },
  {
    icon: <SecurityIcon className="text-4xl text-primary-600" />,
    title: 'Secure Shopping',
    description: 'Safe and secure online shopping experience'
  }
];

const AboutBrand = () => {
  return (
    <Box className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Content */}
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" 
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Enhancing Your Natural Beauty
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-gray-600 mb-8"
                >
                  At SAM E-GlowCo, we believe in the power of natural beauty. Our carefully 
                  curated collection of premium skincare and beauty products is designed to 
                  enhance your natural radiance. We partner with trusted brands that share 
                  our commitment to quality, sustainability, and ethical beauty practices.
                </Typography>
                <Button 
                  variant="contained"
                  size="large"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Learn More About Us
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div 
                variants={itemVariants}
                className="relative"
              >
                <Box className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                  <img
                    src="/path/to/about-image.jpg"
                    alt="About SAM E-GlowCo"
                    className="w-full h-full object-cover"
                  />
                </Box>
                <Paper className="absolute -bottom-6 -left-6 p-4 bg-white shadow-lg rounded-lg max-w-[200px]">
                  <Typography variant="h6" className="font-bold text-primary-600">
                    10+ Years
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Of beauty expertise and customer satisfaction
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Features Grid */}
          <Grid container spacing={4} className="mt-16">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  variants={itemVariants}
                  className="text-center"
                >
                  <Paper 
                    elevation={0} 
                    className="p-6 h-full bg-white rounded-xl hover:shadow-md transition-shadow duration-300"
                  >
                    <Box className="mb-4">
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" className="font-semibold mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Stats Section */}
          <Box className="mt-20 text-center">
            <Grid container spacing={4}>
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '1000+', label: 'Products' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: '24/7', label: 'Customer Support' }
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={stat.label}>
                  <motion.div
                    variants={itemVariants}
                    className="p-4"
                  >
                    <Typography 
                      variant="h3" 
                      className="font-bold text-primary-600 mb-2"
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {stat.label}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutBrand; 