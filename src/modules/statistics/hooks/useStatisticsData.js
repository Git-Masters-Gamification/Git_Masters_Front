// src/modules/statistics/hooks/useStatisticsData.js
import { useEffect, useState } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import { withRetry } from "../../../utils";
import { useAuth } from "../../../context/AuthContext";

/**
 * Hook personalizado para obtener las estadísticas del usuario autenticado.
 * Maneja estados de carga, error y reintento.
 */
export const useStatisticsData = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const response = await withRetry(
          () => api.get(API.STATISTICS.ME),
          2, // intentos
          800 // milisegundos entre reintentos
        );

        if (!mounted) return;
        setStats(response.data);
      } catch (err) {
        console.error("❌ Error al obtener estadísticas:", err);

        if (!mounted) return;

        if (err.response) {
          const { status } = err.response;
          if (status === 401) logout();
          else if (status === 404)
            setError("Estadísticas no encontradas (404).");
          else if (status >= 500)
            setError("Error interno del servidor. Reintentar más tarde.");
          else setError("No se pudieron cargar las estadísticas.");
        } else {
          setError("Error de conexión. Verifica tu red.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      mounted = false;
    };
  }, [logout]);

  return { stats, loading, error, refetch: () => api.get(API.STATISTICS.ME) };
};

export default useStatisticsData;