import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UrlShortener from './UrlShortener'; 
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shorten" element={<UrlShortener />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}


export default App;
