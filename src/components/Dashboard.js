// By Juma Samwel
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input } from 'reactstrap';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';


const Dashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [countyCounts, setCountyCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all'); // For filtering
  const [selectedCounty, setSelectedCounty] = useState('all'); // For filtering

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-feedback');
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
      data.forEach((feedback) => {
        categoryData[feedback.category] = (categoryData[feedback.category] || 0) + 1;
        countyData[feedback.county] = (countyData[feedback.county] || 0) + 1;
      });
      setCategoryCounts(categoryData);
      setCountyCounts(countyData);
    };

    fetchData();
  }, []);

  // Filter feedback data based on selected category and county
  const filteredFeedbackData = feedbackData.filter((feedback) => {
    const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory;
    const matchesCounty = selectedCounty === 'all' || feedback.county === selectedCounty;
    return matchesCategory && matchesCounty;
  });

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

  return (
    <Container className="mt-5">
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
                    {Object.keys(countyCounts).map((county) => (
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
      </Row>

      {/* Feedback Table (Filtered) */}
      <Row className="mt-5">
        <Col>
          <Card style={{ border: '2px solid #000000' }}>
            <CardBody style={{ backgroundColor: '#FFFFFF' }}>
              <h4 className="card-title" style={{ color: '#000000' }}>
                Recent Feedback
              </h4>
              <table className="table table-striped" style={{ color: '#000000' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Feedback</th>
                    <th>Category</th>
                    <th>County</th>
                    <th>Date Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbackData.map((feedback, index) => (
                    <tr key={index}>
                      <td>{feedback.email}</td>
                      <td>{feedback.feedback}</td>
                      <td>{feedback.category}</td>
                      <td>{feedback.county}</td>
                      <td>{new Date(feedback.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
