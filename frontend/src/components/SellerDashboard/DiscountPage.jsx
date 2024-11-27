import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import AddDiscountForm from './components/AddDiscountForm';
import { fetchDiscounts, addDiscount, updateDiscount, deleteDiscount } from '../../api/discountService';
import DiscountList from './components/DiscountList';
import AddButton from './components/AddButton';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DiscountFilter from './components/DiscountFilter';
import DiscountSort from './components/DiscountSort';

const sortDiscounts = (discounts, sortBy) => {
  const sortedDiscounts = [...discounts];
  
  switch (sortBy) {
    case 'nameAsc':
      return sortedDiscounts.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sortedDiscounts.sort((a, b) => b.name.localeCompare(a.name));
    case 'percentageAsc':
      return sortedDiscounts.sort((a, b) => a.discountPercentage - b.discountPercentage);
    case 'percentageDesc':
      return sortedDiscounts.sort((a, b) => b.discountPercentage - a.discountPercentage);
    case 'newest':
      return sortedDiscounts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return sortedDiscounts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return sortedDiscounts;
  }
};

function DiscountPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [editDiscount, setEditDiscount] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadDiscounts();
  }, []);

  const loadDiscounts = async () => {
    try {
      const data = await fetchDiscounts();
      setDiscounts(data || []);
    } catch (error) {
      console.error('Error loading discounts:', error);
      setDiscounts([]);
    }
  };

  // Filter discounts based on status
  const filteredDiscounts = useMemo(() => {
    if (!Array.isArray(discounts)) return [];
    
    let filtered = [...discounts];
    const now = new Date();
    
    switch (filter) {
      case 'Active':
        filtered = filtered.filter(discount => 
          discount.status === 'Active'
        );
        break;
      case 'Inactive':
        filtered = filtered.filter(discount => 
          discount.status === 'Inactive'
        );
        break;
      default:
        break;
    }
    return filtered;
  }, [discounts, filter]);

  // Sort filtered discounts
  const sortedDiscounts = useMemo(() => {
    return sortDiscounts(filteredDiscounts, sortBy);
  }, [filteredDiscounts, sortBy]);

  // Paginate sorted discounts
  const paginatedDiscounts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sortedDiscounts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedDiscounts, page]);

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
      await refreshData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    try {
      await deleteDiscount(discountId);
      await refreshData();
    } catch (error) {
      console.error('Error deleting discount:', error);
    }
  };

  const refreshData = async () => {
    await loadDiscounts();
  };

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
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Create Discount Button */}
          <Box sx={{ mb: 3 }}>
            <AddButton
              onClick={handleOpenForm}
              label="CREATE DISCOUNT"
              icon={LocalOfferIcon}
              fullWidth
              sx={{ 
                height: '48px',
                backgroundColor: '#E91E63',
                '&:hover': {
                  backgroundColor: '#D81B60'
                }
              }}
            />
          </Box>

          {/* Filter Tabs */}
          <DiscountFilter 
            filter={filter}
            onFilterChange={setFilter}
          />

          {/* Sort and Count */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="body2" color="textSecondary">
              Showing {paginatedDiscounts.length} of {filteredDiscounts.length} discounts
            </Typography>
            <DiscountSort 
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </Box>

          {/* Discount List */}
          <Box sx={{ flexGrow: 1 }}>
            <DiscountList 
              discounts={paginatedDiscounts}
              onEditDiscount={handleEditDiscount}
              onDeleteDiscount={handleDeleteDiscount}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              totalPages={Math.ceil(filteredDiscounts.length / ITEMS_PER_PAGE)}
            />
          </Box>
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
