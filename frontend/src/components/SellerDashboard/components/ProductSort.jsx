import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <Box sx={{ 
      minWidth: 200,
      '@media (max-width: 600px)': {
        minWidth: '100%',
        marginBottom: 2
      }
    }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
          <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
          <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
          <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
          <MenuItem value="stockAsc">Stock (Low to High)</MenuItem>
          <MenuItem value="stockDesc">Stock (High to Low)</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSort; 