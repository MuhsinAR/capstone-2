const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a separate module for database connection
const bcrypt = require('bcrypt');

// Route for user registration
router.post('/api/users/register', async (req, res) => {
    const { username, email, password, zipcode } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database with hashed password
        const sql = 'INSERT INTO users (username, email, password, zipcode) VALUES (?, ?, ?, ?)';
        db.run(sql, [username, email, hashedPassword, zipcode], function(err) {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('User registered successfully');
                res.status(201).json({ message: 'Registration successful' });
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
