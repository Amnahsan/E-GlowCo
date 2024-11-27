import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge, 
  Button, 
  Menu, 
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import SearchBar from '../ui/SearchBar';
import Navigation from './Navigation';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="fixed" className="bg-white shadow-sm">
      <Toolbar className="justify-between max-w-7xl mx-auto w-full px-4">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src="/logo.png"
            alt="SAM E-GlowCo"
            className="h-10"
            whileHover={{ scale: 1.05 }}
          />
          <Typography variant="h6" className="text-primary-600 font-bold">
            SAM E-GlowCo
          </Typography>
        </Link>

        <Navigation />
        
        <SearchBar />

        <Box className="flex items-center space-x-2">
          <IconButton color="inherit" sx={{ width: '40px', height: '40px', padding: '8px' }}>
            <Badge badgeContent={3} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" sx={{ width: '40px', height: '40px', padding: '8px' }}>
            <Badge badgeContent={2} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <Button
            startIcon={<PersonIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="text-gray-700"
            sx={{ 
              minWidth: '100px',
              height: '40px',
              padding: '8px 16px'
            }}
          >
            Account
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem component={Link} to="/login">Login</MenuItem>
            <MenuItem component={Link} to="/register">Register</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;