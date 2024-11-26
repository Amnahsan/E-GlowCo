import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Toolbar,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

function SideNav({ mobileOpen, onMobileClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/seller-dashboard' },
    { text: 'Products', icon: <InventoryIcon />, path: '/seller-dashboard/products' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/seller-dashboard/orders' },
    { text: 'Discounts', icon: <LocalOfferIcon />, path: '/seller-dashboard/discounts' },
    { text: 'Videos', icon: <VideoLibraryIcon />, path: '/seller-dashboard/videos' },
    { text: 'Chat', icon: <ChatIcon />, path: '/seller-dashboard/chat' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/seller-dashboard/settings' },
  ];

  const drawerContent = (
    <>
      <Toolbar />
      <List sx={{ px: { xs: 1, sm: 2 } }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                }
              }
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: { xs: 40, sm: 45 },
              color: location.pathname === item.path ? 'inherit' : 'text.secondary'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box component="nav">
      {isMobile ? (
        // Mobile drawer
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop drawer
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}

export default SideNav;