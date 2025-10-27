import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';

export default function AuthCallback() {
  const { refresh } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await refresh(); 
        navigate('/dashboard');
      } catch (error) {
        console.error('Error en AuthCallback:', error);
        navigate('/login');
      }
    })();
  }, [navigate, refresh]);

  return <Loader message="Procesando autenticación..." />;
}