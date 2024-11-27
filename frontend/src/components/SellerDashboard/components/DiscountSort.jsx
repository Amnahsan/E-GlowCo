import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const DiscountSort = ({ sortBy, onSortChange }) => {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              py: 1
            }
          }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
          <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
          <MenuItem value="percentageAsc">Percentage (Low to High)</MenuItem>
          <MenuItem value="percentageDesc">Percentage (High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DiscountSort; 