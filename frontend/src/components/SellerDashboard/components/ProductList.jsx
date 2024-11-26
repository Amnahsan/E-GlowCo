import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { fetchProducts, deleteProduct } from '../../../api/productService';

function ProductList({ refreshTrigger, onEditProduct }) {
  const [products, setProducts] = useState([]);

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
      // Refresh the product list after deletion
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock Level</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.discount}%</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => onEditProduct(product)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="error"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductList; 