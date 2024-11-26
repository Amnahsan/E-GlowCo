const jwt = require('jsonwebtoken');

const authenticateSeller = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    if (user.role !== 'seller') {
      return res.status(403).json({ message: 'Access Denied. You are not authorized to perform this action.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateSeller; 