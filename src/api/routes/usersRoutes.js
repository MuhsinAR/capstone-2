// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { getTreatmentOptions, getMentalHealthProfessionals } = require('../services/apiService');



// Route for user authentication
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Call userService to handle user authentication
        const user = await userService.authenticateUser(email, password);
        res.json(user);
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Route for getting treatment options based on user's zip code
router.get('/treatment-options', async (req, res) => {
    const { zipCode } = req.query;
    try {
        const treatmentOptions = await getTreatmentOptions(zipCode);
        res.json(treatmentOptions);
    } catch (error) {
        console.error('Error getting treatment options:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for getting mental health professionals based on user's zip code
router.get('/mental-health-professionals', async (req, res) => {
    const { zipCode } = req.query;
    try {
        const mentalHealthProfessionals = await getMentalHealthProfessionals(zipCode);
        res.json(mentalHealthProfessionals);
    } catch (error) {
        console.error('Error getting mental health professionals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
