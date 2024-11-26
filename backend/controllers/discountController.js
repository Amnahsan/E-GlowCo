const Discount = require('../models/Discount');

// Get all discounts
const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    const newDiscount = await discount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    console.error('Error creating discount:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update a discount
const updateDiscount = async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDiscount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json(updatedDiscount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a discount
const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount
};
