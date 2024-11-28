const Video = require('../models/Video');

// Get all videos for a seller
exports.getSellerVideos = async (req, res) => {
  try {
    const videos = await Video.find({ sellerId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

// Add new video
exports.addVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, category, tags } = req.body;
    
    const video = new Video({
      sellerId: req.user.userId,
      title,
      description,
      videoUrl,
      category,
      tags: tags || []
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error adding video' });
  }
};

// Update video
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video' });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.user.userId
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video' });
  }
};

// Add these methods
exports.trackVideoView = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { watchTime } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Update view count
    video.analytics.views += 1;

    // Update average watch time
    const totalWatchTime = (video.analytics.averageWatchTime * (video.analytics.views - 1)) + watchTime;
    video.analytics.averageWatchTime = totalWatchTime / video.analytics.views;

    // Add to view history
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const viewHistoryEntry = video.analytics.viewHistory.find(
      entry => new Date(entry.date).getTime() === today.getTime()
    );

    if (viewHistoryEntry) {
      viewHistoryEntry.count += 1;
    } else {
      video.analytics.viewHistory.push({
        date: today,
        count: 1
      });
    }

    await video.save();
    res.json({ message: 'Analytics updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating analytics' });
  }
};

exports.getVideoAnalytics = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video.analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
}; 