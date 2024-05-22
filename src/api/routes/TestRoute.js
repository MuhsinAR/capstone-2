// Import necessary modules
const express = require('express');
const router = express.Router();
const db = require('../db');

// Test route to check database connection
router.get('/test-database', (req, res) => {
    // Execute a simple query to fetch data from a table
    const sql = 'SELECT * FROM users LIMIT 1'; // Assuming 'users' is a table in your database
    db.all(sql, (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Query successful:', rows);
            res.json({ message: 'Database connection test successful', data: rows });
        }
    });
});

module.exports = router;
