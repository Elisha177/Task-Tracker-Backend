const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = (req, res, next) => {
    try {
        // Get token from the Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Access denied. Invalid token format.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user info to the request object
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token.' });
    }
};


exports.authorize = (roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'Access forbidden. Role not found.' });
  }

  if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden. Insufficient permissions.' });
  }

  next();
};
