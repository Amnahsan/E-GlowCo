const Product = require('../models/productmodel');

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.body.image;

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct}