const jwt = require('jsonwebtoken');

// Authenticate any logged-in user (both customers and sellers)
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Authenticate sellers only
const authenticateSeller = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'seller') {
      return res.status(403).json({ message: 'Access Denied. Seller access required.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Authenticate customers only
const authenticateCustomer = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Access Denied. Customer access required.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  auth,
  authenticateSeller,
  authenticateCustomer
}; 