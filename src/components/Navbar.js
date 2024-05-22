import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the useUser hook

const Navbar = () => {
  const { user, logout } = useUser(); // Destructure user object and logout function from useUser hook
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear the user context
      logout();
      // Redirect to the login page or any other appropriate page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, you can display an error message to the user
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <nav className="bg-dolphin-gray">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-white text-xl font-bold">Home</Link>
          <Link to="/covid-stats" className="text-white">COVID-19 Stats</Link>
          <Link to="/stigma" className="text-white">Overcoming Stigma</Link>
          <Link to="/treatment-map" className="text-white">Treatment Map</Link>
          <Link to="/addiction-treatment" className="text-white">Addiction Treatment</Link>
          <Link to="/mental-health-treatment" className="text-white">Mental Health Treatment</Link>
          <Link to="/self-care" className="text-white">Self Care</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          {user ? (
            <>
              <li><span className="text-white">Hello, {user.username}</span></li>
              <li><button onClick={handleLogout} className="text-white">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-white">Login</Link></li>
              <li><Link to="/register" className="text-white">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
