import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const OrderSort = ({ sortBy, onSortChange }) => {
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
          <MenuItem value="amountHigh">Amount (High to Low)</MenuItem>
          <MenuItem value="amountLow">Amount (Low to High)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default OrderSort; 