import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getCustomerOrders } from '../../api/customerOrderService';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Processing': return 'info';
    case 'Shipped': return 'primary';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getCustomerOrders();
      setOrders(data);
    } catch (error) {
      setError(error.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center">
          <Typography variant="h6" color="textSecondary">
            You haven't placed any orders yet
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Card>
              <CardContent>
                <Box className="flex justify-between items-start mb-4">
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Order #{order.orderId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box className="text-right">
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      className="mb-2"
                    />
                    <Typography variant="h6">
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Order Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      {/* Products */}
                      <Typography variant="subtitle2" gutterBottom>
                        Products:
                      </Typography>
                      {order.products.map((item, index) => (
                        <Box key={index} className="ml-4 mb-2">
                          <Typography variant="body2">
                            {item.productId?.name || 'Product No Longer Available'}
                            {' × '}{item.quantity}
                            {' - '}${(item.price * item.quantity).toFixed(2)}
                            {item.discount > 0 && (
                              <Chip
                                size="small"
                                label={`${item.discount}% OFF`}
                                color="error"
                                className="ml-2"
                              />
                            )}
                          </Typography>
                        </Box>
                      ))}

                      <Divider className="my-3" />

                      {/* Shipping Address */}
                      <Typography variant="subtitle2" gutterBottom>
                        Shipping Address:
                      </Typography>
                      <Box className="ml-4">
                        <Typography variant="body2">
                          {order.shippingAddress.street}
                        </Typography>
                        <Typography variant="body2">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </Typography>
                        <Typography variant="body2">
                          Phone: {order.shippingAddress.phone}
                        </Typography>
                      </Box>

                      <Divider className="my-3" />

                      {/* Tracking Info */}
                      {order.trackingInfo?.updates?.length > 0 && (
                        <>
                          <Typography variant="subtitle2" gutterBottom>
                            Order Updates:
                          </Typography>
                          {order.trackingInfo.updates.map((update, index) => (
                            <Box key={index} className="ml-4 mb-2">
                              <Typography variant="body2" color="textSecondary">
                                {new Date(update.date).toLocaleString()}
                              </Typography>
                              <Typography variant="body2">
                                Status: {update.status}
                              </Typography>
                              {update.comment && (
                                <Typography variant="body2">
                                  Comment: {update.comment}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderHistory; 