import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import API from '../services/endpoints';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(API.AUTH.ME);
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = useCallback(() => {
    const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    window.location.href = backend + API.AUTH.GITHUB;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.get(API.AUTH.LOGOUT);
    } finally {
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      login,
      logout,
      refresh: fetchMe, // ✅ async refresh function
    }),
    [user, loading, login, logout, fetchMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};