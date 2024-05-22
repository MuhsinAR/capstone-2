import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the useUser hook

const LoginForm = () => {
  const { setUser } = useUser(); // Access setUser function from UserContext
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:3003/api/users/login', formData);
      console.log('Server Response:', response.data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Update user in UserContext
      setMessage('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required autoComplete="current-password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
