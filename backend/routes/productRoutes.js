const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateSeller = require('../middleware/authMiddleware');

router.get('/', authenticateSeller, productController.getProducts);
router.post('/', authenticateSeller, productController.createProduct);
router.put('/:id', authenticateSeller, productController.updateProduct);
router.delete('/:id', authenticateSeller, productController.deleteProduct);

module.exports = router; 