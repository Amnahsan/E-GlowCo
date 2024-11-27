import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductList from './components/ProductList';
import ProductFilter from './components/ProductFilter';
import ProductForm from './components/ProductForm';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import { addProduct, updateProduct } from '../../api/productService';
import AddButton from './components/AddButton';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openForm, setOpenForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, productData);
      } else {
        await addProduct(productData);
      }
      setRefreshList(prev => !prev);
      handleCloseForm();
    } catch (error) {
      console.error('Error saving product:', error);
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
          bgcolor: 'background.default'
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
              Products
            </Typography>
            <AddButton
              onClick={handleOpenForm}
              label="Add New Product"
            />
          </Box>

          <ProductFilter />
        </Box>
        
        {/* Product List */}
        <Box sx={{ 
          px:2,
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: 'background.paper'
        }}>
          <ProductList 
            refreshTrigger={refreshList} 
            onEditProduct={handleEditProduct}
          />
        </Box>

        <ProductForm
          open={openForm}
          handleClose={handleCloseForm}
          onSave={handleSaveProduct}
          editProduct={editProduct}
        />
      </Box>
    </Box>
  );
}

export default ProductsPage; 