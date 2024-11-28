import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {
  ShoppingCart,
  Pending,
  LocalShipping,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const StatCard = ({ icon, title, value, color }) => (
  <Paper className="p-4">
    <Box className="flex items-center space-x-3">
      <Box className={`p-2 rounded-full ${color}`}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h5" className="font-bold">
          {value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const OrderStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <>
      <StatCard
        icon={<ShoppingCart className="text-blue-500" />}
        title="Total Orders"
        value={stats.total}
        color="bg-blue-50"
      />
      <StatCard
        icon={<Pending className="text-orange-500" />}
        title="Pending"
        value={stats.byStatus?.Pending || 0}
        color="bg-orange-50"
      />
      <StatCard
        icon={<LocalShipping className="text-purple-500" />}
        title="Processing"
        value={stats.byStatus?.Processing || 0}
        color="bg-purple-50"
      />
      <StatCard
        icon={<CheckCircle className="text-green-500" />}
        title="Delivered"
        value={stats.byStatus?.Delivered || 0}
        color="bg-green-50"
      />
    </>
  );
};

export default OrderStats; 