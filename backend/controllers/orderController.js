const Order = require('../models/Order');
const Product = require('../models/productModel');

// Get all orders containing seller's products
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get specific order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('customerId', 'name email')
      .populate('products.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update status and add to tracking updates
    order.status = status;
    order.trackingInfo.updates.push({
      status,
      date: new Date(),
      comment
    });

    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
  try {
    console.log('User from token:', req.user);

    // Get basic stats
    const totalOrders = await Order.countDocuments();

    const statusCounts = await Order.aggregate([
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }}
    ]);

    // Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    res.json({
      total: totalOrders,
      today: todayOrders,
      byStatus: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add this to your existing orderController.js
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.user.userId;

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Create order
    const order = new Order({
      customerId,
      products: [{
        productId,
        quantity,
        price: product.price,
        discount: product.discount || 0
      }],
      totalAmount: quantity * product.price * (1 - (product.discount || 0) / 100),
      status: 'Pending',
      paymentMethod: 'COD',
      shippingAddress: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        zipCode: "12345",
        phone: "1234567890"
      }
    });

    // Update product stock
    await Product.findByIdAndUpdate(productId, {
      $inc: { stock: -quantity }
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Add this to your existing controller
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.userId })
      .populate('products.productId', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
}; 