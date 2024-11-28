const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticateSeller } = require('../middleware/authMiddleware');

router.use(authenticateSeller);

router.get('/', videoController.getSellerVideos);
router.post('/', videoController.addVideo);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);
router.post('/:videoId/view', videoController.trackVideoView);
router.get('/:videoId/analytics', videoController.getVideoAnalytics);

module.exports = router; 