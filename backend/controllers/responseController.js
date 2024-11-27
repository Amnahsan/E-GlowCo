const Response = require('../models/Response');
const Feedback = require('../models/Feedback');

exports.addResponse = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { response } = req.body;

    // Validate if feedback exists
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Create new response
    const newResponse = new Response({
      feedbackId,
      sellerId: req.user.userId, // Using userId from token
      response
    });

    await newResponse.save();

    // Update feedback status
    feedback.status = 'responded';
    feedback.response = newResponse;
    await feedback.save();

    // Return populated response
    const populatedResponse = await Response.findById(newResponse._id)
      .populate('sellerId', 'name');

    res.status(201).json(populatedResponse);
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({ 
      message: 'Error adding response', 
      error: error.message 
    });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updatedResponse = await Response.findByIdAndUpdate(
      id,
      { response },
      { new: true }
    ).populate('sellerId', 'name');

    if (!updatedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }

    res.json(updatedResponse);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating response', 
      error: error.message 
    });
  }
}; 