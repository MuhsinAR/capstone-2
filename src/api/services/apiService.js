// Import required modules
const express = require('express');

// Create an Express router instance
const router = express.Router();

// Define a route handler function
router.get('/api/service', (req, res) => {
    // Your API service logic here
    // This is just an example, you can replace it with your actual logic
    res.json({ message: 'API service is working!' });
});

// Export the router so it can be used in the main Express app
module.exports = router;
