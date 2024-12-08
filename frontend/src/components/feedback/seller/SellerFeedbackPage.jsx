import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Drawer,
  CssBaseline,
  Toolbar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import { getSellerFeedbacks } from '../../../api/feedback';
import SellerFeedbackList from './SellerFeedbackList';
import FeedbackStats from './FeedbackStats';
import TopBar from '../../SellerDashboard/components/TopBar';
import SideNav from '../../SellerDashboard/components/SideNav';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const SellerFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchFeedbacks = async () => {
    try {
      const data = await getSellerFeedbacks();
      setFeedbacks(data);
      calculateStats(data);
    } catch (error) {
      setError(error.message || 'Error fetching feedbacks');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (feedbackData) => {
    const total = feedbackData.length;
    const avgRating = feedbackData.reduce((acc, curr) => acc + curr.rating, 0) / total;
    const pending = feedbackData.filter(f => f.status === 'pending').length;
    const responded = feedbackData.filter(f => f.status === 'responded').length;

    setStats({
      total,
      avgRating: avgRating.toFixed(1),
      pending,
      responded
    });
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={handleDrawerToggle} />
      <SideNav 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle}
      />
      
      {/* Main content */}
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    onClose={() => setError('')}
                    className="mb-4"
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              {/* Stats Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              >
                <FeedbackStats stats={stats} />
              </motion.div>

              {/* Tabs Section */}
              <motion.div variants={itemVariants}>
                <Paper className="mb-6">
                  <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    className="border-b border-gray-200"
                  >
                    <Tab 
                      label={
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          All Feedbacks
                        </motion.span>
                      }
                    />
                    <Tab 
                      label={
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Pending
                        </motion.span>
                      }
                    />
                    <Tab 
                      label={
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Responded
                        </motion.span>
                      }
                    />
                  </Tabs>
                </Paper>
              </motion.div>

              {/* Feedback List Section */}
              <motion.div variants={itemVariants}>
                <SellerFeedbackList
                  feedbacks={feedbacks.filter(feedback => {
                    if (tabValue === 1) return feedback.status === 'pending';
                    if (tabValue === 2) return feedback.status === 'responded';
                    return true;
                  })}
                  onRefresh={fetchFeedbacks}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerFeedbackPage; 