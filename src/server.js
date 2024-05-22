const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = 3003;
const JWT_SECRET = 'your_jwt_secret_key';

app.use(cors());
app.use(express.json());

const dbPath = './src/db/users.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('SQLite connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create users and admin tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  zipcode TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 0
)`);

db.run(`CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  street_address TEXT,
  phone_number TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
)`);

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], async (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user: { username: user.username, isAdmin: user.is_admin } });
  });
});

app.post('/api/users/register', async (req, res) => {
  const { username, email, password, zipcode } = req.body;
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.get(checkUsernameQuery, [username], async (err, existingUser) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).send('Error checking username');
    }
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.get(checkEmailQuery, [email], async (err, existingEmail) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).send('Error checking email');
      }
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (username, email, password, zipcode) VALUES (?, ?, ?, ?)';
      db.run(insertQuery, [username, email, hashedPassword, zipcode], function(err) {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).send('Error registering user');
        }
        console.log('User registered successfully');
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

app.get('/api/users/me', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT username, email, zipcode, is_admin FROM users WHERE id = ?';
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: row });
  });
});

app.get('/api/users/zipcode', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT zipcode FROM users WHERE id = ?';
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error('Error fetching user zipcode:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ zipcode: row.zipcode });
  });
});

app.get('/api/locations', (req, res) => {
  const sql = 'SELECT * FROM locations';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching locations:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ locations: rows });
  });
});

app.post('/api/locations', authenticateToken, (req, res) => {
  const { name, service_type, street_address, phone_number, latitude, longitude } = req.body;
  const insertQuery = 'INSERT INTO locations (name, service_type, street_address, phone_number, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(insertQuery, [name, service_type, street_address, phone_number, latitude, longitude], function(err) {
    if (err) {
      console.error('Error adding location:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({
      id: this.lastID,
      name,
      service_type,
      street_address,
      phone_number,
      latitude,
      longitude
    });
  });
});

app.delete('/api/locations/:id', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.params;
  const deleteQuery = 'DELETE FROM locations WHERE id = ?';
  db.run(deleteQuery, [id], function(err) {
    if (err) {
      console.error('Error deleting location:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
