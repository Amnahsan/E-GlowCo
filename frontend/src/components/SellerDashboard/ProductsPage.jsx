import React, { useState } from 'react';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SideNav from './components/SideNav';
import ProductList from './components/ProductList';
import ProductFilter from './components/ProductFilter';
import TopBar from './components/TopBar';
import ProductForm from './components/ProductForm';
import { addProduct, updateProduct } from '../../api/productService';

function ProductsPage() {
  const [openForm, setOpenForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProduct(null); // Clear edit product when closing form
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
      // Handle error (show notification, etc.)
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <TopBar />
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: 'background.paper', borderRadius: 2, mt: 8 }}>
        <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" gutterBottom>Products</Typography>
        </Box>
        <ProductFilter />
        <ProductList 
          refreshTrigger={refreshList} 
          onEditProduct={handleEditProduct}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
        >
          Add Product
        </Button>
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