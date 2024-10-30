// RegistrationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPage.css';


const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegistrationError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register-admin/', { 
        username, 
        email, 
        password 
      });

      if (response.status === 201) {
        // Successful registration
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to login page
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error.response || error);
      setRegistrationError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container"
    style={{ 
      transition: 'transform 0.3s ease', // Add a smooth transition
      ':hover': {
          transform: 'scale(1.05)' // Make it slightly larger on hover
      }
  }}
    >
      <h2>Admin Registration</h2>
      {registrationError && <div className="error">{registrationError}</div>}
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='submit-button'>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;