import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Avatar,
  Badge,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

function TopBar({ onMobileMenuToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileAnchor(null);
    setNotificationAnchor(null);
  };

  const menuItems = [
    { label: 'Profile', icon: <PersonIcon />, action: () => {} },
    { label: 'Settings', icon: <SettingsIcon />, action: () => {} },
    { label: 'Logout', icon: <LogoutIcon />, action: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/';
    }, color: 'text-red-600' }
  ];

  const notifications = [
    { message: 'New order received', time: '5 minutes ago' },
    { message: 'Product stock low', time: '1 hour ago' },
    { message: 'New customer message', time: '2 hours ago' }
  ];

  return (
    <AppBar 
      position="fixed" 
      className="bg-white"
      elevation={0}
    >
      <Toolbar className="h-16 px-4">
        <Box className="flex items-center justify-between w-full gap-4">
          {/* Left section */}
          <Box className="flex items-center gap-4">
            {isMobile && (
              <IconButton
                onClick={onMobileMenuToggle}
                className="text-gray-600 w-8 h-8"
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              className="text-gray-800 font-semibold whitespace-nowrap"
            >
              SAM E-GlowCo
            </Typography>
          </Box>

          {/* Right section */}
          <Box className="flex items-center gap-2">
            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <IconButton
                onClick={handleNotificationMenuOpen}
                className="text-gray-600"
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </motion.div>

            {/* Profile */}
            <Button
              onClick={handleProfileMenuOpen}
              className="ml-2 text-gray-700 normal-case"
              endIcon={!isMobile && <KeyboardArrowDownIcon />}
            >
              <Avatar 
                className="w-8 h-8"
                alt="Seller Name"
              >
                <AccountCircleIcon />
              </Avatar>
              {!isTablet && (
                <Typography variant="body2" className="ml-2 font-medium">
                  John Doe
                </Typography>
              )}
            </Button>
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleMenuClose}
          className="mt-2"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {menuItems.map((item, index) => (
            <MenuItem 
              key={item.label}
              onClick={() => {
                item.action();
                handleMenuClose();
              }}
              className={`${item.color || 'text-gray-700'}`}
            >
              <Box className="flex items-center gap-2 min-w-[150px] py-1">
                {item.icon}
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleMenuClose}
          className="mt-2"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box className="px-4 py-2">
            <Typography variant="subtitle2" className="font-semibold">
              Notifications
            </Typography>
          </Box>
          <Divider />
          {notifications.map((notification, index) => (
            <MenuItem 
              key={index} 
              onClick={handleMenuClose}
              className="px-4 py-3"
            >
              <Box className="flex flex-col gap-1">
                <Typography variant="body2">
                  {notification.message}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; 