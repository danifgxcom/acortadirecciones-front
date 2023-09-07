import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UrlShortener from './UrlShortener';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<Navigate to="/shorten" />} /> : <Route path="/" element={<Navigate to="/login" />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/shorten" element={<ProtectedRoute element={<UrlShortener />} />} />
      </Routes>
    </Router>
  );
}

export default App;
