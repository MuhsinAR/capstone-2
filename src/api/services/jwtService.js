// jwtService.js
const jwt = require('jsonwebtoken');

// Secret key for signing and verifying tokens
const secretKey = 'your_secret_key'; // Replace this with your actual secret key

// Function to generate a new JWT token
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    // Token verification failed
    return null;
  }
};

module.exports = { generateToken, verifyToken };
