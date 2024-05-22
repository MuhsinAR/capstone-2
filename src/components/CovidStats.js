import React, { useState, useEffect } from 'react';

const CovidStats = () => {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryReports, setCountryReports] = useState([]);

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch('https://covid-api.com/api/reports');
        if (!response.ok) {
          throw new Error('Failed to fetch COVID-19 data');
        }
        const data = await response.json();
        setCovidData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
        setLoading(false);
      }
    };

    fetchCovidData();
  }, []);

  useEffect(() => {
    const extractCountryReports = () => {
      const countryMap = new Map();
      covidData.forEach((report) => {
        if (!countryMap.has(report.region.iso)) {
          countryMap.set(report.region.iso, report);
        } else {
          const existingReport = countryMap.get(report.region.iso);
          if (new Date(report.date) > new Date(existingReport.date)) {
            countryMap.set(report.region.iso, report);
          }
        }
      });
      setCountryReports(Array.from(countryMap.values()));
    };

    if (!loading) {
      extractCountryReports();
    }
  }, [covidData, loading]);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl p-6 flex justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">COVID-19 Stats</h2>
        <p className="w-2/3 mb-4">
          As the world continues to grapple with the COVID-19 pandemic, it remains crucial for individuals to adhere to common-sense safety practices to mitigate the spread of the virus. Despite advancements in vaccination efforts, maintaining vigilance and following recommended guidelines are essential to protect both individual and community health. By continuing to practice preventive measures, individuals can help curb the transmission of the virus and minimize the risk of outbreaks, particularly in areas where vaccination rates may be lower or new variants of concern emerge. Moreover, collective adherence to safety protocols demonstrates a commitment to public health and solidarity with vulnerable populations, fostering a sense of responsibility and community resilience in the face of ongoing challenges posed by the pandemic.
        </p>
        <p className="w-2/3 mb-4">
          When traveling to areas with significant COVID-19 transmission rates, it is imperative to take precautionary measures to safeguard personal health and prevent the spread of the virus. Consider the following precautions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Wear a mask in crowded or enclosed spaces, especially where social distancing may be challenging.</li>
          <li>Practice frequent hand hygiene by washing hands with soap and water for at least 20 seconds or using hand sanitizer with at least 60% alcohol.</li>
          <li>Maintain physical distance from individuals outside your household, particularly in indoor settings.</li>
          <li>Avoid large gatherings and crowded events, opting for outdoor activities whenever possible.</li>
          <li>Stay informed about local COVID-19 guidelines and restrictions, and comply with any travel advisories or quarantine requirements implemented by authorities.</li>
          <li>Monitor personal health and seek medical attention if experiencing symptoms associated with COVID-19, such as fever, cough, or difficulty breathing.</li>
          <li>Consider getting tested for COVID-19 before and after traveling to high-risk areas, even if asymptomatic, to detect and prevent potential transmission.</li>
          <li>To the right, you can select a country and see the confirmed COVID-19 pandemic information reported by John's Hopkins University.</li>
        </ul>
      </div>
      <div className="max-w-lg">
        <h3 className="text-lg font-bold mb-2">Please select a country:</h3>
        <select
          value={selectedCountry}
          onChange={handleChange}
          className="block mb-4 bg-primary text-secondary px-4 py-2 rounded"
        >
          <option value="">Select a country</option>
          {countryReports.map((report) => (
            <option key={report.region.iso} value={report.region.iso}>
              {report.region.name}
            </option>
          ))}
        </select>
        {selectedCountry && (
          <div>
            <h3 className="text-lg font-bold mb-2">Latest Report for {selectedCountry}</h3>
            <ul>
              {countryReports
                .filter((report) => report.region.iso === selectedCountry)
                .map((report) => (
                  <li key={report.region.iso} className="mb-4">
                    <p>Date: {report.date}</p>
                    <p>Confirmed cases: {report.confirmed}</p>
                    <p>Deaths: {report.deaths}</p>
                    <p>Recovered: {report.recovered}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CovidStats;
