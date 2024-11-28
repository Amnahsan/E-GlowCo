import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

const VideoFilter = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Box className="mb-6">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search Videos"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Product Demo">Product Demo</MenuItem>
              <MenuItem value="How-to Guide">How-to Guide</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => handleChange('sortBy', e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="views">Most Viewed</MenuItem>
              <MenuItem value="title">Title A-Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoFilter; 