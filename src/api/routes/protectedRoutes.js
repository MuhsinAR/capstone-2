// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

// Protected route that requires authentication
router.get('/profile', authenticateToken, (req, res) => {
    // Access user data from req.user
    res.json({ user: req.user });
});

module.exports = router;
