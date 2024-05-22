const fs = require('fs');
const path = require('path');

// Absolute path to the database file
const dbPath = path.resolve(__dirname, './src/db/users.db');

// Check if the file exists
fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('Database file does not exist:', err);
    } else {
        console.log('Database file exists');

        // Check file permissions
        fs.access(dbPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                console.error('Insufficient permissions to read or write to the database file:', err);
            } else {
                console.log('Read and write permissions granted for the database file');
            }
        });
    }
});
