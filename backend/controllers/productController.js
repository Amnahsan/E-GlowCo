const Product = require('../models/productModel');
const Discount = require('../models/Discount');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      status: req.body.status,
      images: req.body.images || []
    });

    console.log('Product before save:', product);
    const newProduct = await product.save();
    console.log('Saved product:', newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      status: req.body.status,
      images: req.body.images || [] // Array of Cloudinary URLs
    };

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyDiscount = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { discountId } = req.body;

    // Find the discount to get the percentage
    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $addToSet: { discounts: { discount: discountId, appliedAt: new Date() } },
        currentDiscount: discount.discountPercentage
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeDiscount = async (req, res) => {
  try {
    const { id: productId, discountId } = req.params;

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { discounts: { discount: discountId } },
        $set: { currentDiscount: 0 } // Reset current discount
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  applyDiscount, 
  removeDiscount 
};