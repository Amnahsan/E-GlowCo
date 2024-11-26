const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Discount', discountSchema);
