import { createContext } from 'react';

// Contexto global para la autenticación
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refresh: async () => {}, // ✅ async para evitar advertencia SonarLint
});

// ✅ Exporta también el hook personalizado desde aquí (sin duplicar lógica)
export { useAuth } from './useAuth.js';