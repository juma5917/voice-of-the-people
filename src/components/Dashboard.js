// By Juma Samwel
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';


const Dashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [countyCounts, setCountyCounts] = useState({});
  const [sentimentCounts, setSentimentCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all'); // For filtering
  const [selectedCounty, setSelectedCounty] = useState('all'); // For filtering
  const [selectedSentiment, setSelectedSentiment] = useState('all'); // For filtering

  // Fetch data from the API when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/feedback/');
        setFeedbackData(response.data);
        calculateCounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., display an error message to the user
      }
    };

    const calculateCounts = (data) => {
      const categoryData = {};
      const countyData = {};
      const sentimentData = {};
      data.forEach((feedback) => {
        categoryData[feedback.category] = (categoryData[feedback.category] || 0) + 1;
        countyData[feedback.county] = (countyData[feedback.county] || 0) + 1;
        sentimentData[feedback.sentiment_label] = (sentimentData[feedback.sentiment_label] || 0) + 1;
      });
      setCategoryCounts(categoryData);
      setCountyCounts(countyData);
      setSentimentCounts(sentimentData);
    };

    fetchData();
  }, []);

  // Filter feedback data based on selected category and county
  const filteredFeedbackData = feedbackData.filter((feedback) => {
    const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory;
    const matchesCounty = selectedCounty === 'all' || feedback.county === selectedCounty;
    const matchesSentiment = selectedSentiment === 'all' || feedback.sentiment_label === selectedSentiment; 

    return matchesCategory && matchesCounty && matchesSentiment; 
  });

    // Function to delete feedback
    const handleDeleteFeedback = async (feedbackId) => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
  
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/feedback/${feedbackId}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}` // Add Authorization header
            }
          }
        );
  
        if (response.status === 204) {
          // Feedback deleted successfully
          setFeedbackData(feedbackData.filter(feedback => feedback.id !== feedbackId));
          console.log('Feedback deleted successfully!');
        } else {
          // Handle unexpected response
          console.error('Unexpected error deleting feedback:', response);
          // Display a generic error message to the user
          alert('An error occurred while deleting the feedback.'); 
        }
      } catch (error) {
        console.error('Error deleting feedback:', error.response || error);
  
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            // Handle unauthorized error (e.g., token expired)
            alert('You are not authorized to delete this feedback.');
            // You might want to redirect to the login page here
          } else {
            // Handle other API errors (e.g., 404, 500)
            alert('An error occurred while deleting the feedback.'); 
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from server:', error.request);
          alert('Unable to connect to the server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          alert('An error occurred. Please try again later.');
        }
      }
    };
  
  

  // Chart data configuration (dynamically updated based on filters)
  const categoryChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Feedback by Category',
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const countyChartData = {
    labels: Object.keys(countyCounts),
    datasets: [
      {
        label: 'Feedback by County',
        data: Object.values(countyCounts),
        backgroundColor: [
          '#FF5733',
          '#3498DB',
          '#F39C12',
          '#1ABC9C',
          '#8E44AD',
          '#EC7063',
        ],
      },
    ],
  };

  const sentimentChartData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Feedback by Sentiment',
        data: Object.values(sentimentCounts),
        backgroundColor: [
          '#4CAF50', // Green for positive
          '#F44336', // Red for negative
          '#FFC107', // Yellow for neutral
        ],
      },
    ],
  };

  // Function to download data as CSV
  const downloadCSV = () => {
    const csvData = filteredFeedbackData.map((feedback) => ({
      'Email': feedback.email,
      'Feedback': feedback.feedback,
      'Category': feedback.category,
      'County': feedback.county,
      'Date Submitted': new Date(feedback.created_at).toLocaleDateString(),
      'Sentiment Score': feedback.sentiment_score,
      'Sentiment Label': feedback.sentiment_label,
    }));

    // Convert JSON data to CSV format
    const csvRows = [
      Object.keys(csvData[0]).join(','), // Header row
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(',')),
    ].join('\n');

    // Create a Blob object with the CSV data
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'feedback_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5"
    style={{ 
      transition: 'transform 0.3s ease', // Add a smooth transition
      ':hover': {
          transform: 'scale(1.05)' // Make it slightly larger on hover
      }
  }}
    >
      <h2 className="text-center mb-4">
        Government Dashboard
      </h2>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h5 className="card-title" style={{ color: '#000000' }}>
                Filter by Category
              </h5>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {Object.keys(categoryCounts).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h5 className="card-title" style={{ color: '#000000' }}>
                Filter by County
              </h5>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                  >
                    <option value="all">All Counties</option>
                    {Object.keys(countyCounts).map((sentiment_label) => (
                      <option key={sentiment_label} value={sentiment_label}>
                        {sentiment_label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6}>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h4 className="card-title" style={{ color: '#000000' }}>
                Feedback by Category
              </h4>
              <Pie data={categoryChartData} />
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h4 className="card-title" style={{ color: '#000000' }}>
                Feedback by County
              </h4>
              <Bar data={countyChartData} />
            </CardBody>
          </Card>
        </Col>

        <Col md={6}> {/* Adjust column width as needed */}
        <Card style={{ border: '2px solid #000000' }}>
          <CardBody style={{ backgroundColor: '#FFFFFF' }}>
            <h4 className="card-title" style={{ color: '#000000' }}>
              Feedback by Sentiment
            </h4>
            <Line data={sentimentChartData} /> {/* Add the Pie chart */}
          </CardBody>
        </Card>
      </Col>

        {/* Sentiment Filter */}
        <Col md={6}> {/* Adjust column width as needed */}
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h5 className="card-title" style={{ color: '#000000' }}>
                Filter by Sentiment
              </h5>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    value={selectedSentiment}
                    onChange={(e) => setSelectedSentiment(e.target.value)}
                  >
                    {/* <option value="all">All Sentiments</option>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                    <option value="neutral">Neutral</option> */}

                    <option value="all">All Sentiments</option>
                    {Object.keys(sentimentCounts).map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
                      
      </Row>

      {/* Feedback Table (Filtered) */}
      <Row className="mt-5">
        <Col>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h4 className="card-title" style={{ color: '#000000' }}>
                Recent Feedback
                <Button color="success" size="sm" className="ms-3" onClick={downloadCSV}>
                  Download CSV
                </Button>
              </h4>
              <table className="table table-striped" style={{ color: '#000000' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Feedback</th>
                    <th>Category</th>
                    <th>County</th>
                    <th>Date Submitted</th>
                    <th>Sentiment Score</th>
                    <th>Sentiment Label</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbackData.map((feedback, index) => (
                    <tr key={index}>
                      <td>{feedback.email}</td>
                      <td>{feedback.feedback}</td>
                      <td>{feedback.category}</td>
                      <td>{feedback.county}</td>
                      <td>{new Date(feedback.created_at).toLocaleDateString()}</td>
                      <td>{feedback.sentiment_score}</td>
                      <td>{feedback.sentiment_label}</td>
                      <td>
                        <Button color="danger" size="sm" onClick={() => handleDeleteFeedback(feedback.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="http://127.0.0.1:5000" target="_blank" rel="noopener noreferrer">
                <Button color="primary" size="sm" className="mt-3">
                  Go to Prediction Page
                </Button>
              </a>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
