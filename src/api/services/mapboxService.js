// services/mapboxService.js
const axios = require('axios');

async function getMentalHealthProfessionals(zipCode) {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/mental_health.json?country=US&postcode=${zipCode}&types=health`);
        // Process the response and extract mental health professionals data
        const mentalHealthProfessionals = response.data.features.map(feature => ({
            name: feature.text,
            address: feature.properties.address,
            // Add other relevant data
        }));
        return mentalHealthProfessionals;
    } catch (error) {
        console.error('Error fetching mental health professionals:', error);
        throw new Error('Error fetching mental health professionals');
    }
}

module.exports = { getMentalHealthProfessionals };
