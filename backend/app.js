const express = require('express');
const app = express();
const discountRoutes = require('./routes/discountRoutes');

// ... other middleware
app.use('/api/seller/discounts', discountRoutes); 