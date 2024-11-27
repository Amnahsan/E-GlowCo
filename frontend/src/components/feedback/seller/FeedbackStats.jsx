import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {
  Star,
  Comment,
  CheckCircle,
  PendingActions
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

const FeedbackStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <>
      <StatCard
        icon={<Star className="text-yellow-500" />}
        title="Average Rating"
        value={stats.avgRating}
        color="bg-yellow-50"
      />
      <StatCard
        icon={<Comment className="text-blue-500" />}
        title="Total Feedbacks"
        value={stats.total}
        color="bg-blue-50"
      />
      <StatCard
        icon={<PendingActions className="text-orange-500" />}
        title="Pending"
        value={stats.pending}
        color="bg-orange-50"
      />
      <StatCard
        icon={<CheckCircle className="text-green-500" />}
        title="Responded"
        value={stats.responded}
        color="bg-green-50"
      />
    </>
  );
};

export default FeedbackStats; 