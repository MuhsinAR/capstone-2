const bcrypt = require('./bcryptjs');

// Function to hash a password
async function hashPassword(password) {
    try {
        // Generate a salt with a cost factor of 10
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        // Handle error
        console.error('Error hashing password:', error);
        throw error;
    }
}

// Function to compare a plain text password with a hashed password
async function comparePasswords(plainPassword, hashedPassword) {
    try {
        // Compare the plain text password with the hashed password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        // Handle error
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    comparePasswords,
};
