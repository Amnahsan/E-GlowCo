import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { fetchProducts, deleteProduct, applyDiscount, removeDiscount } from '../../../api/productService';
import ApplyDiscountForm from './ApplyDiscountForm';

function ProductList({ refreshTrigger, onEditProduct }) {
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDiscountForm, setOpenDiscountForm] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, [refreshTrigger]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleApplyDiscount = async (productId, discountId) => {
    try {
      await applyDiscount(productId, discountId);
      // Refresh the product list
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  };

  const handleRemoveDiscount = async (productId, discountId) => {
    try {
      console.log('Removing discount:', productId, discountId); // Debug log
      await removeDiscount(productId, discountId);
      // Refresh the product list
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      // Close the discount form after successful removal
      setOpenDiscountForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to remove discount:', error);
    }
  };

  // Mobile view card layout
  if (isMobile) {
    return (
      <>
        <Box sx={{ mt: 2 }}>
          {products.map((product) => (
            <Card key={product._id} sx={{ mb: 2, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  {product.images?.[0] && (
                    <Box
                      component="img"
                      src={product.images[0]}
                      alt={product.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: 'cover',
                        mr: 2
                      }}
                    />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    Stock: {product.stock}
                  </Typography>
                  <Typography variant="body2">
                    Discount: {product.discount}%
                  </Typography>
                  <Typography variant="body2">
                    Status: {product.status}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton 
                    size="small" 
                    onClick={() => onEditProduct(product)}
                    color="primary"
                    sx={{ padding: '20px', width: '20px', height: '20px',backgroundColor: '#e3f2fd' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(product._id)}
                    color="error"
                    sx={{  padding: '20px', width: '20px', height: '20px' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDiscountForm(true);
                    }}
                    color="secondary"
                    sx={{ padding: '20px', width: '20px', height: '20px' }}
                  >
                    <LocalOfferIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <ApplyDiscountForm
          open={openDiscountForm}
          handleClose={() => {
            setOpenDiscountForm(false);
            setSelectedProduct(null);
          }}
          onApply={handleApplyDiscount}
          onRemove={handleRemoveDiscount}
          product={selectedProduct}
        />
      </>
    );
  }

  // Desktop/Tablet view table layout
  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 3,
          borderRadius: 2,
          overflowX: 'auto'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Product</TableCell>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Stock</TableCell>
              <TableCell sx={{ color: 'white' }}>Discount</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell align="center" sx={{ width: '90px', color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ width: '30%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {product.images?.[0] && (
                      <Box
                        component="img"
                        src={product.images[0]}
                        alt={product.name}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <Typography noWrap>{product.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ width: '15%' }}>{product.category}</TableCell>
                <TableCell sx={{ width: '10%' }}>${product.price}</TableCell>
                <TableCell sx={{ width: '8%' }}>{product.stock}</TableCell>
                <TableCell sx={{ width: '8%' }}>{product.discount}%</TableCell>
                <TableCell width="8%" >
                  <Box
                    sx={{
                      backgroundColor: product.status === 'Active' ? 'success.light' : 'error.light',
                      color: 'white',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      display: 'inline-block'
                    }}
                  >
                    {product.status}
                  </Box>
                </TableCell>
                <TableCell width="10%" >
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton 
                      size="medium" 
                      onClick={() => onEditProduct(product)}
                      color="primary"
                      sx={{ padding: '20px', width: '20px', height: '20px' }}
                    >
                      <EditIcon fontSize="medium" />
                    </IconButton>
                    <IconButton 
                      size="medium" 
                      onClick={() => handleDelete(product._id)}
                      color="error"
                      sx={{ padding: '20px', width: '20px', height: '20px' }}
                    >
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                    <IconButton 
                      size="medium" 
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenDiscountForm(true);
                      }}
                      color="secondary"
                      sx={{ padding: '20px', width: '20px', height: '20px' }}
                    >
                      <LocalOfferIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ApplyDiscountForm
        open={openDiscountForm}
        handleClose={() => {
          setOpenDiscountForm(false);
          setSelectedProduct(null);
        }}
        onApply={handleApplyDiscount}
        onRemove={handleRemoveDiscount}
        product={selectedProduct}
      />
    </>
  );
}

export default ProductList;