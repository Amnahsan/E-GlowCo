import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Notifications,
  DarkMode,
  Language,
  VolumeUp,
  Security,
  Email
} from '@mui/icons-material';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';

const SettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [state, setState] = React.useState({
    notifications: true,
    darkMode: false,
    emailAlerts: true,
    soundEnabled: true,
    twoFactor: false,
    language: 'English'
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.checked
    });
  };

  const settingsItems = [
    {
      icon: <Notifications color="primary" />,
      text: 'Push Notifications',
      key: 'notifications'
    },
    {
      icon: <DarkMode color="primary" />,
      text: 'Dark Mode',
      key: 'darkMode'
    },
    {
      icon: <Email color="primary" />,
      text: 'Email Alerts',
      key: 'emailAlerts'
    },
    {
      icon: <VolumeUp color="primary" />,
      text: 'Sound Enabled',
      key: 'soundEnabled'
    },
    {
      icon: <Security color="primary" />,
      text: 'Two-Factor Authentication',
      key: 'twoFactor'
    },
    {
      icon: <Language color="primary" />,
      text: 'Language',
      key: 'language'
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={handleDrawerToggle} />
      <SideNav 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '40px' },
          mt: { xs: '56px', sm: '64px' },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          overflow: 'auto',
          overflowX: 'hidden'
        }}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          flexShrink: 0
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Settings
            </Typography>

            <Paper elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
              <List>
                {settingsItems.map((item, index) => (
                  <React.Fragment key={item.key}>
                    <ListItem>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        secondary={item.key === 'language' ? 'Current: English' : null}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={state[item.key]}
                          onChange={handleChange(item.key)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < settingsItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Version: 1.0.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date().toLocaleDateString()}
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage; 