import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const RegisterForm = () => {
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    zipcode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/api/users/register', formData);
      console.log('Server Response:', response.data);
      setUsername(formData.username);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Please Register Below</h2>
      <div className="w-80">
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zipcode">Zip Code:</label>
            <input type="text" id="zipcode" name="zipcode" onChange={handleChange} value={formData.zipcode} />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
