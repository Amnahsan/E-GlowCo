import React from 'react';
import { AppBar, Toolbar, Typography,  Box, Button } from '@mui/material';

function TopBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">SAM E-GlowCo Seller</Typography>
        {/* <TextField
          size="small"
          placeholder="Search..."
          sx={{ width: '40%', bgcolor: 'white', borderRadius: 1 }}
        /> */}
        <Box>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Settings</Button>
          <Button color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; 