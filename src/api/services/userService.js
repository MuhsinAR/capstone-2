// services/userService.js
const bcrypt = require('./bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

// Open a new SQLite database connection
const db = new sqlite3.Database('database.db');

// Function to register a new user
async function registerUser(username, email, password, zipCode) {
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Users (username, email, password, zip_code) VALUES (?, ?, ?, ?)`;
            db.run(query, [username, email, hashedPassword, zipCode], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ userId: this.lastID });
                }
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Error registering user');
    }
}

// Function to authenticate a user
async function authenticateUser(email, password) {
    try {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Users WHERE email = ?`;
            db.get(query, [email], async (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!row) {
                    reject(new Error('User not found'));
                    return;
                }
                const passwordMatch = await bcrypt.compare(password, row.password);
                if (!passwordMatch) {
                    reject(new Error('Invalid password'));
                    return;
                }
                // If authentication is successful, generate JWT token
                const token = jwt.sign({
                    userId: row.user_id,
                    username: row.username,
                    email: row.email
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                resolve({ token });
            });
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw new Error('Error authenticating user');
    }
}

module.exports = { registerUser, authenticateUser };
