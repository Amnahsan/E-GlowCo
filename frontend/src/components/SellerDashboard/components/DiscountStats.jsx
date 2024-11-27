import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {
  LocalOffer,
  Timer,
  CheckCircle,
  TrendingDown
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

const DiscountStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <>
      <StatCard
        icon={<LocalOffer className="text-blue-500" />}
        title="Total Discounts"
        value={stats.total}
        color="bg-blue-50"
      />
      <StatCard
        icon={<Timer className="text-orange-500" />}
        title="Active"
        value={stats.active}
        color="bg-orange-50"
      />
      <StatCard
        icon={<CheckCircle className="text-green-500" />}
        title="Products Applied"
        value={stats.applied}
        color="bg-green-50"
      />
      <StatCard
        icon={<TrendingDown className="text-purple-500" />}
        title="Avg. Discount"
        value={`${stats.avgDiscount}%`}
        color="bg-purple-50"
      />
    </>
  );
};

export default DiscountStats; 