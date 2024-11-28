const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateSeller } = require('../middleware/authMiddleware');

router.get('/', productController.getProducts);
router.post('/', authenticateSeller, productController.createProduct);
router.put('/:id', authenticateSeller, productController.updateProduct);
router.delete('/:id', authenticateSeller, productController.deleteProduct);
router.post('/:id/apply-discount', authenticateSeller, productController.applyDiscount);
router.delete('/:id/remove-discount/:discountId', authenticateSeller, productController.removeDiscount);
router.get('/stats', authenticateSeller, productController.getProductStats);

module.exports = router; 