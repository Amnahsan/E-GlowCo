const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Tutorial', 'Product Demo', 'How-to Guide', 'Other']
  },
  subCategory: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  analytics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    averageWatchTime: { type: Number, default: 0 },
    viewHistory: [{
      date: { type: Date },
      count: { type: Number }
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema); 