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

const DiscountSort = ({ sort, onSortChange, search, onSearchChange }) => {
  const handleSearch = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Box className="mb-6">
      <Grid container spacing={2} alignItems="center">
        {/* Search Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search discounts..."
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
              <MenuItem value="highDiscount">Highest Discount</MenuItem>
              <MenuItem value="lowDiscount">Lowest Discount</MenuItem>
              <MenuItem value="endingSoon">Ending Soon</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiscountSort; 