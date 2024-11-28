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
  Box,
  Typography
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PropTypes from 'prop-types';

const menuItemVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const MenuItem = ({ icon, text, path, selected }) => (
  <motion.div
    variants={menuItemVariants}
    whileHover="hover"
    className="w-full"
  >
    <ListItem 
      button 
      component={Link} 
      to={path}
      selected={selected}
      className={`rounded-lg mb-1 ${
        selected 
          ? 'bg-primary-600 text-white hover:bg-primary-700' 
          : 'hover:bg-gray-100'
      }`}
    >
      <ListItemIcon className={`min-w-[40px] ${selected ? 'text-white' : 'text-gray-500'}`}>
        {icon}
      </ListItemIcon>
      <ListItemText 
        primary={
          <Typography variant="body2" className="font-medium">
            {text}
          </Typography>
        }
      />
    </ListItem>
  </motion.div>
);

const SideNav = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const drawerWidth = 240;
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/seller-dashboard' },
    { text: 'Products', icon: <InventoryIcon />, path: '/seller-dashboard/products' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/seller-dashboard/orders' },
    { text: 'Discounts', icon: <LocalOfferIcon />, path: '/seller-dashboard/discounts' },
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/seller-dashboard/feedback' },
    { text: 'Videos', icon: <VideoLibraryIcon />, path: '/seller-dashboard/videos' },
    { text: 'Chat', icon: <ChatIcon />, path: '/seller-dashboard/chat' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/seller-dashboard/settings' },
  ];

  const drawerContent = (
    <Box className="h-full bg-white">
      <Toolbar className="px-6">
        <Typography variant="h6" className="font-semibold text-primary-600">
          E-GlowCo Seller
        </Typography>
      </Toolbar>
      <List className="px-3 py-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            path={item.path}
            selected={location.pathname === item.path}
          />
        ))}
      </List>
    </Box>
  );

  const handleItemClick = (path) => {
    navigate(path);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <Box component="nav">
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          className="w-[240px]"
          PaperProps={{
            className: "w-[240px] border-r border-gray-200"
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          className="w-[240px] hidden sm:block"
          PaperProps={{
            className: "w-[240px] border-r border-gray-200"
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

SideNav.propTypes = {
  mobileOpen: PropTypes.bool,
  onMobileClose: PropTypes.func
};

export default SideNav;