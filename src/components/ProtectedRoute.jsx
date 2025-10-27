// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// ✅ Validación de props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};