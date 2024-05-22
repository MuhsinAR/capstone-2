// zipcode.js

const express = require('express');
const router = express.Router();

// Route handler to retrieve the user's zipcode
router.get('/', (req, res) => {
  try {
    // Log the session object to inspect its contents
    console.log('Session:', req.session);
    
    // Assuming the user's zipcode is stored in the session
    const { zipcode } = req.session.user;
    
    // Send the user's zipcode in the response
    res.json({ zipcode });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error fetching user zipcode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
