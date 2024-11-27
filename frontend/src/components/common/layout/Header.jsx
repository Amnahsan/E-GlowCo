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
      <Toolbar className="justify-between w-full">
        <Box className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src="/images/logo.jpeg"
              alt="SAM E-GlowCo"
              className="h-8 md:h-10 rounded-full transform hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
            />
            <Typography variant="h6" className="text-primary-600 font-bold hidden sm:block">
              SAM E-GlowCo
            </Typography>
          </Link>

          <Navigation />
          
          <SearchBar />

          <Box className="flex items-center space-x-1 md:space-x-2">
            <IconButton className="text-gray-400 hover:text-primary-600 w-10 h-10">
              <Badge badgeContent={3} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton className="text-gray-400 hover:text-primary-600 w-10 h-10">
              <Badge badgeContent={2} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <Button
              startIcon={<PersonIcon />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className="text-gray-700 hover:text-primary-600"
              sx={{ 
                minWidth: '100px',
                height: '40px',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: 'primary.50'
                }
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;