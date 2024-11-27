import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';

const ProductFilter = ({ filter, onFilterChange }) => {
  const handleChange = (event, newValue) => {
    onFilterChange(newValue);
  };

  return (
    <Paper className="mb-6">
      <Tabs
        value={filter}
        onChange={handleChange}
        className="border-b border-gray-200"
      >
        <Tab 
          label="All Products" 
          value="all" 
        />
        <Tab 
          label="Active" 
          value="active"
        />
        <Tab 
          label="Inactive" 
          value="inactive"
        />
      </Tabs>
    </Paper>
  );
};

export default ProductFilter; 