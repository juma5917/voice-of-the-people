// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login-admin/', { 
        username, 
        password 
      });

      if (response.status === 200) {
        // Successful login
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token); // Store JWT token
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      setLoginError('Invalid credentials');
    }
  };

  return (
    <div className="login-container"
    style={{ 
      transition: 'transform 0.3s ease', // Add a smooth transition
      ':hover': {
          transform: 'scale(1.05)' // Make it slightly larger on hover
      }
  }}
    >
      <h2>Admin Login</h2>
      {loginError && <div className="error">{loginError}</div>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='submit-button'>Login </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;