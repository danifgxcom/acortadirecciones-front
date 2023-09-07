import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
