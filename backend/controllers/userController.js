const User = require('../models/usermodel');

const userController = {
  getSellers: async (req, res) => {
    try {
      const sellers = await User.find({ role: 'seller' })
        .select('name email')
        .sort({ name: 1 });
      
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching sellers' });
    }
  }
};

module.exports = userController; 