const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  images: [String], // Array of image URLs
  discounts: [{
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
    appliedAt: { type: Date, default: Date.now }
  }],
  currentDiscount: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
});

// Create the model
const ProductModel = mongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
