const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substring(2, 15).toUpperCase()
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductModel',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Card'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  trackingInfo: {
    carrier: String,
    trackingNumber: String,
    updates: [{
      status: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      comment: String
    }]
  }
}, { 
  timestamps: true 
});

// Calculate total amount before saving
orderSchema.pre('save', async function(next) {
  if (!this.isModified('products')) return next();

  this.totalAmount = this.products.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    const discountAmount = (itemPrice * item.discount) / 100;
    return total + (itemPrice - discountAmount);
  }, 0);
  next();
});

// Add index for better query performance
orderSchema.index({ orderId: 1, status: 1, createdAt: -1 });
orderSchema.index({ customerId: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema); 