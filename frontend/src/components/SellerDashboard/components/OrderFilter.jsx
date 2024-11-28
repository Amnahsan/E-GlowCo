import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const OrderFilter = ({ filter, onFilterChange }) => {
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
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="ALL ORDERS" value="all" />
        <Tab label="PENDING" value="Pending" />
        <Tab label="PROCESSING" value="Processing" />
        <Tab label="SHIPPED" value="Shipped" />
        <Tab label="DELIVERED" value="Delivered" />
      </Tabs>
    </Box>
  );
};

export default OrderFilter; 