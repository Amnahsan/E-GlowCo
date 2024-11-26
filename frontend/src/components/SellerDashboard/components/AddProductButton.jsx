import React from 'react';
import { Button } from '@mui/material';

function AddProductButton({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Add Product
    </Button>
  );
}

export default AddProductButton; 