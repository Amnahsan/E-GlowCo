import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const DiscountFilter = ({ filter, onFilterChange }) => {
  const handleChange = (event, newValue) => {
    onFilterChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={filter}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '1rem',
            minWidth: 'auto',
            px: 4,
            py: 2
          }
        }}
      >
        <Tab label="ALL DISCOUNTS" value="all" />
        <Tab label="ACTIVE" value="Active" />
        <Tab label="INACTIVE" value="Inactive" />
      </Tabs>
    </Box>
  );
};

export default DiscountFilter; 