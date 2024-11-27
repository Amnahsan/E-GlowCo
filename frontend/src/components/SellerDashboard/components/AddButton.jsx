import React from 'react';
import { Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';

const buttonVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

function AddButton({ onClick, label, icon: Icon = AddIcon }) {
  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        variant="contained"
        onClick={onClick}
        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg shadow-sm"
        startIcon={
          <Box component={motion.div}
            animate={{ 
              rotate: [0, 180, 360], 
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon />
          </Box>
        }
      >
        {label}
      </Button>
    </motion.div>
  );
}

export default AddButton; 