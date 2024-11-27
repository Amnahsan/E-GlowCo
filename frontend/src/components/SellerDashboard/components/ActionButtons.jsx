import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const buttonVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

function ActionButtons() {
  const navigate = useNavigate();

  const buttons = [
    {
      icon: <AddIcon />,
      label: 'Add Product',
      description: 'Create a new product listing',
      onClick: () => navigate('/seller-dashboard/products'),
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      icon: <ShoppingCartIcon />,
      label: 'View Orders',
      description: 'Check your recent orders',
      onClick: () => navigate('/seller-dashboard/orders'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      icon: <ChatIcon />,
      label: 'Start Chat',
      description: 'Chat with customers',
      onClick: () => navigate('/seller-dashboard/chat'),
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {buttons.map((button, index) => (
        <motion.div
          key={button.label}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            onClick={button.onClick}
            className={`w-full h-full min-h-[120px] ${button.color} text-white p-6 rounded-xl`}
          >
            <Box className="flex flex-col items-center text-center space-y-2">
              {button.icon}
              <Typography variant="h6" className="font-semibold">
                {button.label}
              </Typography>
              <Typography variant="body2" className="opacity-80">
                {button.description}
              </Typography>
            </Box>
          </Button>
        </motion.div>
      ))}
    </Box>
  );
}

export default ActionButtons; 