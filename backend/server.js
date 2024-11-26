const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/seller/products', productRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
}); 