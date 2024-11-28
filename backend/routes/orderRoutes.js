const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateCustomer, authenticateSeller } = require('../middleware/authMiddleware');

// Customer routes
router.post('/create', authenticateCustomer, orderController.createOrder);
router.get('/my-orders', authenticateCustomer, orderController.getCustomerOrders);

// Seller routes
router.get('/', authenticateSeller, orderController.getSellerOrders);
router.get('/stats', authenticateSeller, orderController.getOrderStats);
router.get('/:orderId', authenticateSeller, orderController.getOrderDetails);
router.put('/:orderId/status', authenticateSeller, orderController.updateOrderStatus);

module.exports = router; 