import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

const categories = [
  {
    id: 1,
    name: 'Skincare',
    image: '/images/skin-care.jpg',
    description: 'Natural and effective skincare products',
    itemCount: 45
  },
  {
    id: 2,
    name: 'Makeup',
    image: '/images/makeup.jpg',
    description: 'Professional makeup essentials',
    itemCount: 78
  },
  {
    id: 3,
    name: 'Haircare',
    image: '/images/hair-care.jpg',
    description: 'Premium hair treatment products',
    itemCount: 34
  },
  {
    id: 4,
    name: 'Fragrances',
    image: '/images/fragrances.jpg',
    description: 'Luxury perfumes and fragrances',
    itemCount: 23
  }
];

const Categories = () => {
  return (
    <Box className="py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Typography 
          variant="h2" 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Shop by Category
        </Typography>
        
        <Typography 
          variant="body1" 
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Explore our wide range of beauty products across different categories
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <motion.div variants={itemVariants}>
                <Link to={`/category/${category.name.toLowerCase()}`}>
                  <Paper 
                    className="relative overflow-hidden group cursor-pointer"
                    elevation={0}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="aspect-w-1 aspect-h-1"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <Box className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <Typography variant="h5" className="font-semibold mb-2">
                          {category.name}
                        </Typography>
                        <Typography variant="body2" className="opacity-90 mb-2">
                          {category.description}
                        </Typography>
                        <Typography variant="caption" className="opacity-75">
                          {category.itemCount} Products
                        </Typography>
                      </Box>
                    </motion.div>
                  </Paper>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Categories; 