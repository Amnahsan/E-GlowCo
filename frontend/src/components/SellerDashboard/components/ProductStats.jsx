import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {
  Inventory,
  Warning,
  CheckCircle,
  LocalOffer
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

const ProductStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <>
      <StatCard
        icon={<Inventory className="text-blue-500" />}
        title="Total Products"
        value={stats.total}
        color="bg-blue-50"
      />
      <StatCard
        icon={<CheckCircle className="text-green-500" />}
        title="Active Products"
        value={stats.active}
        color="bg-green-50"
      />
      <StatCard
        icon={<Warning className="text-orange-500" />}
        title="Low Stock"
        value={stats.lowStock}
        color="bg-orange-50"
      />
      <StatCard
        icon={<LocalOffer className="text-purple-500" />}
        title="With Discounts"
        value={stats.withDiscount}
        color="bg-purple-50"
      />
    </>
  );
};

export default ProductStats; 