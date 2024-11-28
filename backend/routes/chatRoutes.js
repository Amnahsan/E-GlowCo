const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { auth } = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', chatController.getChats);
router.get('/:chatId/messages', chatController.getChatMessages);
router.post('/:chatId/messages', chatController.sendMessage);
router.post('/create', chatController.createChat);

module.exports = router; 