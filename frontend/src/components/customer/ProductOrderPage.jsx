import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button,
  TextField,
  Snackbar,
  Alert,
  Box 
} from '@mui/material';
import { fetchProducts } from '../../api/productService';
import { createOrder } from '../../api/orderService';

const ProductOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (productId, quantity) => {
    try {
      await createOrder(productId, quantity);
      setSuccess(true);
      loadProducts();
    } catch (error) {
      setError(error.message || 'Error placing order');
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" gutterBottom>
        Order Products
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard 
              product={product}
              onOrder={handleOrder}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          Order placed successfully!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!error} 
        autoHideDuration={3000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const ProductCard = ({ product, onOrder }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        
        <Box className="mt-4 flex items-center gap-4">
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            size="small"
            inputProps={{ min: 1 }}
          />
          <Button 
            variant="contained"
            onClick={() => onOrder(product._id, quantity)}
          >
            Order Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductOrderPage; 