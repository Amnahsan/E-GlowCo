const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketSetup = require('./socket/chatSocket');

const connectDB = require('./config/db');
const authRoutes = require('./routes/userroute');  // Correct import path for authRoutes
const productRoute = require('./routes/productRoutes');
const product = require('./routes/productRoutes');
const discountRoutes = require('./routes/discountRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const orderRoutes = require('./routes/orderRoutes');
const videoRoutes = require('./routes/videoRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);

dotenv.config();
connectDB();

// Enable CORS for all origins
app.use(cors());  // This allows requests from any origin (for development)

// Enable JSON parsing
app.use(express.json());

// Define JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;  // Attach user data to request
    next();  // Continue to next middleware/route handler
  });
};

// Set up Socket.IO
socketSetup(server);

// Define your routes
app.use('/api/auth', authRoutes);  // Use the authRoutes for registration and login
app.use('/api/product', productRoute);  // Use the productRoute for product-related operations, requiring JWT authentication
app.use('/api/seller/products', product);
app.use('/api/seller/discounts', discountRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/seller/orders', orderRoutes);
app.use('/api/seller/videos', videoRoutes);
app.use('/api/chat', chatRoutes);
// Example protected route
app.get('/api/admin-data', authenticateJWT, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'This is admin-only data' });
  } else {
    res.status(403).json({ message: 'You do not have permission to access this data.' });
  }
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
