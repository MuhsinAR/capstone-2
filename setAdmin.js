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

// Set tetrisguy263 as admin
const username = 'tetrisguy263';
const updateAdminStatusQuery = 'UPDATE users SET is_admin = 1 WHERE username = ?';

db.run(updateAdminStatusQuery, [username], function(err) {
  if (err) {
    console.error('Error updating admin status:', err.message);
  } else if (this.changes === 0) {
    console.log('User not found.');
  } else {
    console.log(`${username} is now an admin.`);
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
