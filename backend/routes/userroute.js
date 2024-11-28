const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const userController = require('../controllers/userController');
const { authenticateCustomer } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/sellers', authenticateCustomer, userController.getSellers);

module.exports = router;
