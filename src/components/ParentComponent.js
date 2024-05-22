import React, { useState, useEffect } from 'react';

const ParentComponent = () => {
  const [country, setCountry] = useState('USA'); // Default country
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCovidData();
  }, [country]);

  const fetchCovidData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
      if (!response.ok) {
        throw new Error('Failed to fetch COVID-19 data');
      }
      const data = await response.json();
      setCovidData(data);
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <h1>COVID-19 Statistics</h1>
      <label htmlFor="country">Select a country:</label>
      <select id="country" value={country} onChange={handleCountryChange}>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="UK">UK</option>
        {/* Add more countries as needed */}
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : covidData ? (
        <div>
          <h2>{covidData.country}</h2>
          <p>Cases: {covidData.cases}</p>
          <p>Deaths: {covidData.deaths}</p>
          <p>Recovered: {covidData.recovered}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ParentComponent;
