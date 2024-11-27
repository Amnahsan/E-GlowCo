const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  response: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Response', responseSchema); 