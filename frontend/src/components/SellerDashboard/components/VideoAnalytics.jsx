import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Visibility, ThumbUp, Share, Timer } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const VideoAnalytics = ({ analytics }) => {
  const stats = [
    { 
      icon: <Visibility />,
      label: 'Total Views',
      value: analytics.views,
      color: COLORS[0]
    },
    { 
      icon: <ThumbUp />,
      label: 'Total Likes',
      value: analytics.likes,
      color: COLORS[1]
    },
    { 
      icon: <Share />,
      label: 'Total Shares',
      value: analytics.shares,
      color: COLORS[2]
    },
    { 
      icon: <Timer />,
      label: 'Avg. Watch Time',
      value: `${Math.round(analytics.averageWatchTime)}s`,
      color: COLORS[3]
    }
  ];

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box className="flex items-center gap-2">
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  <Box>
                    <Typography variant="h6">{stat.value}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoAnalytics; 