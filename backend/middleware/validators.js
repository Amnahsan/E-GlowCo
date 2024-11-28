const Joi = require('joi');

const cartItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

const phoneRegex = /^\+?[\d\s-]{10,}$/;

const addressSchema = Joi.object({
  street: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
  state: Joi.string().required().trim(),
  zipCode: Joi.string().required().trim(),
  phone: Joi.string().pattern(phoneRegex).required()
});

const orderSchema = Joi.object({
  products: Joi.array().items(cartItemSchema).min(1).required(),
  shippingAddress: addressSchema.required(),
  paymentMethod: Joi.string().valid('COD', 'Card').required()
});

module.exports = {
  validateCartItem: (req, res, next) => {
    const { error } = cartItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  },

  validateOrder: (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  },

  validatePhone: (req, res, next) => {
    if (!phoneRegex.test(req.body.shippingAddress?.phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    next();
  }
}; 