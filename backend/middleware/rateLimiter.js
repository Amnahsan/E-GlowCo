const rateLimit = require('express-rate-limit');

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 10 orders per windowMs
});

const cartLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50 // limit each IP to 50 cart operations per windowMs
});

module.exports = { orderLimiter, cartLimiter }; 