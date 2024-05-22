import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import SelfCarePage from './components/SelfCarePage';
import CovidStats from './components/CovidStats';
import StigmaPage from './components/StigmaPage';
import MentalHealthTreatmentPage from './components/MentalHealthTreatmentPage';
import AddictionTreatmentPage from './components/AddictionTreatmentPage';
import TreatmentMap from './components/TreatmentMap';
import axios from 'axios';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

const AppContent = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details using the token and update the context
      axios.get('http://localhost:3003/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data.user);
      }).catch(error => {
        console.error('Failed to fetch user details:', error);
      });
    }
  }, [setUser]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-green-500 h-4"></div> {/* Green bar across the top */}
      <Navbar /> {/* Include Navbar component */}
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/self-care" element={<SelfCarePage />} />
        <Route path="/covid-stats" element={<CovidStats />} />
        <Route path="/stigma" element={<StigmaPage />} />
        <Route path="/mental-health-treatment" element={<MentalHealthTreatmentPage />} />
        <Route path="/addiction-treatment" element={<AddictionTreatmentPage />} />
        <Route path="/treatment-map" element={<TreatmentMap />} />
      </Routes>
    </div>
  );
};

export default App;
