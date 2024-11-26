import React from 'react';
import { Box, Toolbar, Paper, Typography } from '@mui/material';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import MetricsOverview from './components/MetricsOverview';
import ActionButtons from './components/ActionButtons';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <TopBar />
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: 'background.paper', borderRadius: 2, mt: 8 }}>
        <Toolbar />
        <MetricsOverview />
        <ActionButtons />
        <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>Details</Typography>
          {/* Add detailed views here */}
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard; 