// // By Juma Samwel
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import FeedbackForm from './components/FeedbackForm';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';

// function App() {
//     return (
//         <Router>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/feedback" element={<FeedbackForm />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


// App.js (updated)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import RegistrationPage from './components/RegistrationPage'; // Import RegistrationPage
import LoginPage from './components/LoginPage'; // Import LoginPage

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Check for token

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/register" element={<RegistrationPage />} /> {/* Registration route */}
        <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} // Protect dashboard route
        />
      </Routes>
    </Router>
  );
}

export default App;