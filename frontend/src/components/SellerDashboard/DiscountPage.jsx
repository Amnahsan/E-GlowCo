import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import AddDiscountForm from './components/AddDiscountForm';
import { fetchDiscounts, addDiscount, updateDiscount, deleteDiscount } from '../../api/discountService';
import DiscountList from './components/DiscountList';
import AddButton from './components/AddButton';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function DiscountPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [editDiscount, setEditDiscount] = useState(null);

  useEffect(() => {
    loadDiscounts();
  }, []);

  const loadDiscounts = async () => {
    try {
      const data = await fetchDiscounts();
      setDiscounts(data);
    } catch (error) {
      console.error('Error loading discounts:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenForm = () => {
    setEditDiscount(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditDiscount(null);
  };

  const handleEditDiscount = (discount) => {
    setEditDiscount(discount);
    setOpenForm(true);
  };

  const handleSaveDiscount = async (discountData) => {
    try {
      if (editDiscount) {
        await updateDiscount(editDiscount._id, discountData);
      } else {
        await addDiscount(discountData);
      }
      loadDiscounts();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    try {
      await deleteDiscount(discountId);
      loadDiscounts();
    } catch (error) {
      console.error('Error deleting discount:', error);
    }
  };

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
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          bgcolor: 'background.default',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1,
            mb: 2
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1"
              sx={{ fontWeight: 500 }}
            >
              Discounts
            </Typography>
            <AddButton
              onClick={handleOpenForm}
              label="Create Discount"
              icon={LocalOfferIcon}
            />
          </Box>
        </Box>
        
        {/* Discounts List */}
        <Box sx={{ 
          px: 2,
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: 'background.paper'
        }}>
          <DiscountList 
            discounts={discounts}
            onEditDiscount={handleEditDiscount}
            onDeleteDiscount={handleDeleteDiscount}
          />
        </Box>

        <AddDiscountForm
          open={openForm}
          handleClose={handleCloseForm}
          onSave={handleSaveDiscount}
          editDiscount={editDiscount}
        />
      </Box>
    </Box>
  );
}

export default DiscountPage;
