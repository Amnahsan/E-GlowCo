import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const categories = [
  'Skincare',
  'Haircare',
  'Makeup',
  'Fragrances',
  'Tools & Accessories'
];

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategoryOpen = (event) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DesktopNav = () => (
    <Box className="hidden md:flex items-center space-x-6">
      <Button 
        component={Link} 
        to="/" 
        className="text-gray-700"
        sx={{ width: '100px', height: '40px' }}
      >
        Home
      </Button>
      
      <Button
        className="text-gray-700"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleCategoryOpen}
        sx={{ width: '120px', height: '40px' }}
      >
        Categories
      </Button>
      
      {/* <Menu
        anchorEl={categoryAnchor}
        open={Boolean(categoryAnchor)}
        onClose={handleCategoryClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {categories.map((category) => (
          <MenuItem 
            key={category}
            onClick={handleCategoryClose}
            component={Link}
            to={`/category/${category.toLowerCase()}`}
          >
            {category}
          </MenuItem>
        ))}
      </Menu> */}

      <Button 
        component={Link} 
        to="/about" 
        className="text-gray-700"
        sx={{ width: '100px', height: '40px' }}
      >
        About Us
      </Button>
      
      <Button 
        component={Link} 
        to="/blog" 
        className="text-gray-700"
        sx={{ width: '100px', height: '40px' }}
      >
        Blog
      </Button>
      
      <Button 
        component={Link} 
        to="/contact" 
        className="text-gray-700"
        sx={{ width: '100px', height: '40px' }}
      >
        Contact
      </Button>
    </Box>
  );

  const MobileNav = () => (
    <Box className="md:hidden">
      <IconButton 
        onClick={handleMobileToggle} 
        className="text-gray-700"
        sx={{ width: '40px', height: '40px' }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileToggle}
        className="md:hidden"
      >
        <List className="w-64 p-4">
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          
          {categories.map((category) => (
            <ListItem 
              button 
              key={category}
              component={Link}
              to={`/category/${category.toLowerCase()}`}
            >
              <ListItemText primary={category} />
            </ListItem>
          ))}
          
          <ListItem button component={Link} to="/about">
            <ListItemText primary="About Us" />
          </ListItem>
          
          <ListItem button component={Link} to="/blog">
            <ListItemText primary="Blog" />
          </ListItem>
          
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};

export default Navigation; 