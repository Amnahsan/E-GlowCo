import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  IconButton,
  Rating,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const products = [
  {
    id: 1,
    name: 'Natural Face Cream',
    price: 29.99,
    rating: 4.5,
    image: 'path/to/image1.jpg',
    discount: 20,
    isNew: true
  },
  // Add more products...
];

const FeaturedProducts = () => {
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
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Featured Products
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <motion.div variants={itemVariants}>
                <Card className="relative group hover:shadow-lg transition-shadow duration-300">
                  {product.discount > 0 && (
                    <Chip
                      label={`${product.discount}% OFF`}
                      color="error"
                      size="small"
                      className="absolute top-2 left-2 z-10"
                    />
                  )}
                  {product.isNew && (
                    <Chip
                      label="NEW"
                      color="primary"
                      size="small"
                      className="absolute top-2 right-2 z-10"
                    />
                  )}
                  
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    className="h-48 object-cover"
                  />
                  
                  <Box className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <IconButton className="bg-white hover:bg-gray-100">
                      <ShoppingCartIcon />
                    </IconButton>
                    <IconButton className="bg-white hover:bg-gray-100">
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  <CardContent>
                    <Typography variant="h6" className="font-medium mb-1">
                      {product.name}
                    </Typography>
                    
                    <Box className="flex items-center mb-2">
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" className="ml-1 text-gray-600">
                        ({product.rating})
                      </Typography>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <Typography variant="h6" className="font-bold text-primary-600">
                        ${product.price}
                      </Typography>
                      {product.discount > 0 && (
                        <Typography variant="body2" className="line-through text-gray-400">
                          ${(product.price * (1 + product.discount/100)).toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default FeaturedProducts; 