import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

// Hook reutilizable para acceder al contexto
export const useAuth = () => useContext(AuthContext);