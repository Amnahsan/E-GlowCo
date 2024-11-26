import React from 'react';
import { Box, Button } from '@mui/material';

function ActionButtons({ onAddProduct }) {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
      <Button variant="contained" color="primary" onClick={() => window.location.href = '/seller-dashboard/products'}>
        Add Product
      </Button>
      <Button variant="contained" color="primary">View Orders</Button>
      <Button variant="contained" color="primary">Start Chat</Button>
    </Box>
  );
}

export default ActionButtons; 