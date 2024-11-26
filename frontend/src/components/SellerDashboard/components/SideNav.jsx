import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

function SideNav() {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          paddingTop: '64px' // Add top padding to prevent overlap with header
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/seller-dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/products">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/orders">
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/discounts">
          <ListItemText primary="Discounts" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/videos">
          <ListItemText primary="Videos" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/chat">
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button component={Link} to="/seller-dashboard/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideNav;