// capstone-2/src/controllers/userController.js

const db = require('../db/database');

// Controller function for registering a user
const registerUser = (req, res) => {
  const { username, email, password, zipCode } = req.body;
  
  // Insert user data into the database
  const sql = `INSERT INTO users (username, email, password, zipCode) VALUES (?, ?, ?, ?)`;
  db.run(sql, [username, email, password, zipCode], (err) => {
    if (err) {
      console.error('Error registering user:', err.message);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    console.log('User registered successfully');
    res.status(200).json({ message: 'User registered successfully' });
  });
};

module.exports = { registerUser };
