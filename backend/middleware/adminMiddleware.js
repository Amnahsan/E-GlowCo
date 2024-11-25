const jwt = require('jsonwebtoken');

// Middleware to verify JWT and check for admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the user to the request object

    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { verifyAdmin };
