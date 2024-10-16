import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css'; // Import your CSS file

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [county, setCounty] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submit-feedback', {
        feedback,
        email,
        category,
        county,
      });
      setMessage('Feedback submitted successfully!');
      // Clear the form after submission
      setFeedback('');
      setEmail('');
      setCategory('');
      setCounty('');
    } catch (error) {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Your Community, Your Platform</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="corruption">Corruption</option>
            <option value="embezzlement">Embezzlement</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="education">Education</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="county">County/Region:</label>
          <select
            id="county"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          >
            <option value="">Select a county</option>
            {/* Add options for all Kenyan counties */}
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Migori">Migori</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Nyeri">Nyeri</option>
            <option value="Kakamega">Kakamega</option>
            <option value="Wajir">Wajir</option>
            <option value="Tharaka-Nithi">Tharaka-Nithi</option>
            <option value="Machakos">Machakos</option>
            <option value="Makueni ">Makueni </option>
            <option value="Kirinyaga">Kirinyaga</option>
            <option value="Kiambu">Kiambu</option>
            <option value="Turkana ">Turkana </option>
            {/* <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Eldoret">Eldoret</option> */}
            {/* ... other counties */}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FeedbackForm;
