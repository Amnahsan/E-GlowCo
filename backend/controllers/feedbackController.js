const Feedback = require('../models/Feedback');
const Response = require('../models/Response');

// Get all feedbacks for a product
exports.getProductFeedbacks = async (req, res) => {
  try {
    const { productId } = req.params;
    const feedbacks = await Feedback.find({ productId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product feedbacks', error: error.message });
  }
};

// Get user's feedbacks
exports.getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user._id })
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user feedbacks', error: error.message });
  }
};

// Get seller's feedbacks
exports.getSellerFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name')
      .populate('productId')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller feedbacks', error: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    console.log('Creating feedback with body:', req.body);
    console.log('User from token:', req.user);

    // Validate required fields
    if (!req.body.rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }
    if (!req.body.comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    // Create feedback with userId from authenticated user
    const feedback = new Feedback({
      userId: req.user.userId,
      productId: req.body.productId || null,
      rating: req.body.rating,
      comment: req.body.comment,
      images: req.body.images || [],
      status: 'pending'
    });

    console.log('Created feedback object:', feedback);

    await feedback.save();
    
    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('userId', 'name')
      .populate('productId', 'name');

    res.status(201).json(populatedFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ 
      message: 'Error creating feedback', 
      error: error.message,
      details: error.toString() 
    });
  }
};

// Get specific feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('userId', 'name')
      .populate('productId', 'name');
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this feedback' });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this feedback' });
    }

    await feedback.deleteOne();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
}; 