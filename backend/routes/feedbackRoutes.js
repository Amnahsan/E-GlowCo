const express = require('express');
const router = express.Router();
const { auth, authenticateSeller, authenticateCustomer } = require('../middleware/authMiddleware');
const feedbackController = require('../controllers/feedbackController');
const responseController = require('../controllers/responseController');

// Customer routes (require customer authentication)
router.post('/', authenticateCustomer, feedbackController.createFeedback);
router.get('/my-feedbacks', authenticateCustomer, feedbackController.getUserFeedbacks);
router.put('/:id', authenticateCustomer, feedbackController.updateFeedback);
router.delete('/:id', authenticateCustomer, feedbackController.deleteFeedback);

// Public routes (no authentication required)
router.get('/product/:productId', feedbackController.getProductFeedbacks);
router.get('/:id', feedbackController.getFeedback);

// Seller routes (require seller authentication)
router.get('/seller/feedbacks', authenticateSeller, feedbackController.getSellerFeedbacks);
router.post('/:feedbackId/response', authenticateSeller, responseController.addResponse);
router.put('/response/:id', authenticateSeller, responseController.updateResponse);

module.exports = router;