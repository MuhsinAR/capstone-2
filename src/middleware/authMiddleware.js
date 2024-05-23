// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'central263');
    req.user = decoded; // Attach user data to the request object

    // Check if the user is admin
    if (req.user.username === 'tetrisguy263') {
      req.user.isAdmin = true;
    } else {
      req.user.isAdmin = false;
    }
    
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = { authenticateToken };
