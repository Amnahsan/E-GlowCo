import React from 'react';
import { Box, TextField, Button } from '@mui/material';

function ProductFilter() {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <TextField label="Search" variant="outlined" size="small" />
      <Button variant="outlined">Filter</Button>
    </Box>
  );
}

export default ProductFilter; 