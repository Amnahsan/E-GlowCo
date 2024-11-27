import React, { useState } from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { motion } from 'framer-motion';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import MetricsOverview from './components/MetricsOverview';
import ActionButtons from './components/ActionButtons';
import { sellerTheme } from '../../themes/sellerTheme';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={sellerTheme}>
      <CssBaseline />
      <Box className="min-h-screen bg-gray-50">
        <TopBar onMobileMenuToggle={handleDrawerToggle} />
        <SideNav 
          mobileOpen={mobileOpen} 
          onMobileClose={handleDrawerToggle}
        />
        
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 lg:ml-64 p-6"
        >
          <Box className="max-w-7xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <MetricsOverview />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              <ActionButtons />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {/* Add your dashboard content here */}
            </motion.div>
          </Box>
        </motion.main>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard; 