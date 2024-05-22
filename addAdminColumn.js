const sqlite3 = require('sqlite3').verbose();

// Path to the SQLite database file
const dbPath = './src/db/users.db';

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('SQLite connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Add is_admin column to users table
const addAdminColumnQuery = 'ALTER TABLE users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT 0';

db.run(addAdminColumnQuery, function(err) {
  if (err) {
    console.error('Error adding is_admin column:', err.message);
  } else {
    console.log('is_admin column added successfully.');
  }

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});
