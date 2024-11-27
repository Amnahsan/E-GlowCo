const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/res\.cloudinary\.com\/.*/.test(v);
      },
      message: props => `${props.value} is not a valid Cloudinary URL!`
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'responded', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema); 