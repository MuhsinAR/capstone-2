const sqlite3 = require('sqlite3').verbose();

// Path to the SQLite database file
const DB_PATH = './src/db/users.db';

// Connect to SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('SQLite connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  zipCode TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.error('Error creating users table:', err.message);
  } else {
    console.log('Users table created successfully');
  }
});

// Create locations table if not exists
db.run(`CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  street_address TEXT,
  phone_number TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  FOREIGN KEY (username) REFERENCES users (username)
)`, (err) => {
  if (err) {
    console.error('Error creating locations table:', err.message);
  } else {
    console.log('Locations table created successfully');
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database connection:', err.message);
  } else {
    console.log('Database connection closed');
  }
});
