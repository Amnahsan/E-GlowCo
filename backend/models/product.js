const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['moisturizer', 'serum', 'toner', 'facewash', 'sunscreen'] },
  stock: { type: Number, required: true },
  image: { type: String } 
});

// Create the model
const Product = mongoose.model('product', productSchema);

module.exports = Product;
