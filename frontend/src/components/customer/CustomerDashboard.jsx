import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Box 
} from '@mui/material';
import { 
  ShoppingBag, 
  Feedback, 
  Person,
  History,
  Logout 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    // Navigate to home page
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Shop Products',
      description: 'Browse and order products',
      icon: <ShoppingBag sx={{ fontSize: 40 }} />,
      path: '/order-products',
      color: 'primary.main'
    },
    {
      title: 'My Feedback',
      description: 'View and manage your product feedback',
      icon: <Feedback sx={{ fontSize: 40 }} />,
      path: '/feedback',
      color: 'secondary.main'
    },
    {
      title: 'Order History',
      description: 'View your order history',
      icon: <History sx={{ fontSize: 40 }} />,
      path: '/order-history',
      color: 'success.main'
    }
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Welcome Section with Logout */}
      <Box className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
        <Box className="flex justify-between items-center">
          <div>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.name || 'Customer'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your shopping and feedback from your personal dashboard
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Logout />}
            onClick={handleLogout}
            className="hover:bg-primary-50"
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Menu Grid */}
      <Grid container spacing={4}>
        {menuItems.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Card 
              className="h-full transition-transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="text-center p-6">
                <Box 
                  className="rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  sx={{ backgroundColor: `${item.color}15` }}
                >
                  {React.cloneElement(item.icon, { 
                    sx: { color: item.color } 
                  })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Profile Section */}
      <Card className="mt-8">
        <CardContent>
          <Box className="flex items-center gap-4">
            <Person sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6">
                Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user?.email}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CustomerDashboard; 