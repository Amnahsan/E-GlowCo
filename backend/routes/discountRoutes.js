const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { authenticateSeller } = require('../middleware/authMiddleware');

router.get('/', authenticateSeller, discountController.getDiscounts);
router.post('/', authenticateSeller, discountController.createDiscount);
router.put('/:id', authenticateSeller, discountController.updateDiscount);
router.delete('/:id', authenticateSeller, discountController.deleteDiscount);
router.get('/stats', authenticateSeller, discountController.getDiscountStats);

module.exports = router;
