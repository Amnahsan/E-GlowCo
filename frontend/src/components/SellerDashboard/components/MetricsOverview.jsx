import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

function MetricsOverview() {
  const metrics = [
    { label: 'Total Products', value: '100' },
    { label: 'Total Orders', value: '50' },
    { label: 'Revenue', value: '$5000' },
    { label: 'Discounts Active', value: '5' },
  ];

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Metrics Overview</Typography>
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: 'primary.light' }}>
              <Typography variant="h6">{metric.value}</Typography>
              <Typography variant="body2">{metric.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default MetricsOverview; 