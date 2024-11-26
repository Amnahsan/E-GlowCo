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
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function TopBar({ onMobileMenuToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        minHeight: { xs: 56, sm: 64 }, // Responsive height
        px: { xs: 1, sm: 2, md: 3 } // Responsive padding
      }}>
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMobileMenuToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            SAM E-GlowCo Seller
          </Typography>
        </Box>

        {/* Right section */}
        {isTablet ? (
          // Mobile/Tablet menu
          <Box>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          // Desktop buttons
          <Box sx={{ 
            display: 'flex', 
            gap: { sm: 1, md: 2 }
          }}>
            <Button 
              color="inherit"
              sx={{ 
                minWidth: { md: 100 },
                px: { sm: 1, md: 2 }
              }}
            >
              Profile
            </Button>
            <Button 
              color="inherit"
              sx={{ 
                minWidth: { md: 100 },
                px: { sm: 1, md: 2 }
              }}
            >
              Settings
            </Button>
            <Button 
              color="inherit"
              sx={{ 
                minWidth: { md: 100 },
                px: { sm: 1, md: 2 }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; 