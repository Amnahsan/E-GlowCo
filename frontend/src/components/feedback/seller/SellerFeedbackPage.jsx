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
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import { getSellerFeedbacks } from '../../../api/feedback';
import SellerFeedbackList from './SellerFeedbackList';
import FeedbackStats from './FeedbackStats';
import TopBar from '../../SellerDashboard/components/TopBar';
import SideNav from '../../SellerDashboard/components/SideNav';

const SellerFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <Box className="flex">
      {/* Side Navigation */}
      <SideNav mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />

      {/* Main Content */}
      <Box className="flex-grow">
        {/* Top Bar */}
        <TopBar onMenuClick={handleDrawerToggle}>
          <Typography variant="h6" className="text-gray-700">
            Feedback Management
          </Typography>
        </TopBar>

        {/* Page Content - Added pt-16 to account for TopBar height */}
        <Box className="p-6 pt-20">
          <Container maxWidth="lg">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
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

              <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <FeedbackStats stats={stats} />
              </Box>

              <Paper className="mb-6">
                <Tabs
                  value={tabValue}
                  onChange={(_, newValue) => setTabValue(newValue)}
                  className="border-b border-gray-200"
                >
                  <Tab label="All Feedbacks" />
                  <Tab label="Pending" />
                  <Tab label="Responded" />
                </Tabs>
              </Paper>

              <SellerFeedbackList
                feedbacks={feedbacks.filter(feedback => {
                  if (tabValue === 1) return feedback.status === 'pending';
                  if (tabValue === 2) return feedback.status === 'responded';
                  return true;
                })}
                onRefresh={fetchFeedbacks}
              />
            </AnimatePresence>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerFeedbackPage; 