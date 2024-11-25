const express = require('express');
const { addProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Routes for products
router.post('/add', verifyAdmin, addProduct);

module.exports = router;
