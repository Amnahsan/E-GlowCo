import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Grid
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ProductSort = ({ sort, onSortChange, search, onSearchChange }) => {
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    onSearchChange(event.target.value);
  };

  return (
    <Box className="mb-6">
      <Grid container spacing={2} alignItems="center">
        {/* Search Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Sort Field */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="priceHigh">Price: High to Low</MenuItem>
              <MenuItem value="priceLow">Price: Low to High</MenuItem>
              <MenuItem value="nameAZ">Name: A to Z</MenuItem>
              <MenuItem value="nameZA">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductSort; 