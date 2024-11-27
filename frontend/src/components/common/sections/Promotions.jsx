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
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TimerIcon from '@mui/icons-material/Timer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
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

const promotions = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Up to 40% off on selected skincare products',
    image: '/path/to/promo1.jpg',
    endDate: '2024-08-31',
    discount: '40%',
    bgColor: 'bg-pink-100'
  },
  {
    id: 2,
    title: 'New Customer Special',
    description: 'Get 15% off on your first purchase',
    image: '/path/to/promo2.jpg',
    code: 'WELCOME15',
    discount: '15%',
    bgColor: 'bg-purple-100'
  },
  // Add more promotions...
];

const Promotions = () => {
  return (
    <Box className="py-20">
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
              Special Offers
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Don't miss out on these amazing deals and exclusive offers.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {promotions.map((promo) => (
              <Grid item xs={12} md={6} key={promo.id}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    className={`relative overflow-hidden ${promo.bgColor} rounded-xl`}
                    elevation={0}
                  >
                    <Box className="p-8 flex flex-col md:flex-row items-center gap-6">
                      <Box className="w-full md:w-1/2">
                        <Typography 
                          variant="h3" 
                          className="text-2xl font-bold mb-2"
                        >
                          {promo.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          className="text-gray-600 mb-4"
                        >
                          {promo.description}
                        </Typography>
                        
                        {promo.code && (
                          <Box className="flex items-center gap-2 mb-4">
                            <LocalOfferIcon className="text-primary-600" />
                            <Typography 
                              variant="h6" 
                              className="font-mono bg-white px-3 py-1 rounded"
                            >
                              {promo.code}
                            </Typography>
                          </Box>
                        )}
                        
                        {promo.endDate && (
                          <Box className="flex items-center gap-2 text-gray-600">
                            <TimerIcon />
                            <Typography variant="body2">
                              Ends: {new Date(promo.endDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        )}

                        <Button 
                          variant="contained"
                          className="mt-6 bg-primary-600 hover:bg-primary-700"
                        >
                          Shop Now
                        </Button>
                      </Box>

                      <Box className="w-full md:w-1/2">
                        <Box className="relative">
                          <img
                            src={promo.image}
                            alt={promo.title}
                            className="w-full rounded-lg"
                          />
                          <Box className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full">
                            <Typography variant="h6" className="font-bold">
                              {promo.discount} OFF
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Promotions; 