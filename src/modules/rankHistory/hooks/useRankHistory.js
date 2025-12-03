// src/modules/rankHistory/hooks/useRankHistory.js
import { useEffect, useState } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";

export function useRankHistory(userId = null) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      // Si no hay usuario, no llamamos al backend
      if (!userId) {
        setHistory([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const endpoint = API.RANK_HISTORY.USER(userId);
        const res = await api.get(endpoint, { withCredentials: true });

        // Tu backend devuelve: { success, message, data: [...] }
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setHistory(data);
      } catch (err) {
        console.error("Error fetching rank history:", err);
        setError(err?.response?.data?.message || err.message || "Error al cargar el historial.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [userId]);

  return { history, loading, error };
}