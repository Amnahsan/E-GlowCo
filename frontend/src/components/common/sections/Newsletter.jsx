import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Alert,
  Collapse
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <Box className="py-16 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center px-4"
      >
        <Typography 
          variant="h2" 
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Stay Beautiful, Stay Updated
        </Typography>
        
        <Typography 
          variant="body1" 
          className="text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Subscribe to our newsletter for exclusive offers, beauty tips, and new product alerts.
        </Typography>

        <Paper 
          component="form" 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 p-2 max-w-xl mx-auto"
          elevation={0}
        >
          <TextField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            size="small"
            className="flex-grow"
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-primary-600 hover:bg-primary-700 whitespace-nowrap px-8"
            endIcon={<SendIcon />}
          >
            Subscribe
          </Button>
        </Paper>

        <Collapse in={status === 'success'}>
          <Alert 
            severity="success" 
            className="mt-4 max-w-xl mx-auto"
          >
            Thank you for subscribing! Check your email for confirmation.
          </Alert>
        </Collapse>

        <Typography 
          variant="caption" 
          className="text-gray-500 mt-4 block"
        >
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Newsletter; 