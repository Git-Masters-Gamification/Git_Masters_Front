import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import Loader from '../../../components/Loader';
import '../../../styles/pages/_events.scss';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [includePayload, setIncludePayload] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const url = includePayload
          ? `${API.EVENTS.ITEM(id)}?include=payload`
          : API.EVENTS.ITEM(id);
        const res = await api.get(url);
        setEvent(res.data);
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, includePayload]);

  if (loading) return <Loader />;
  if (!event) return <p className="event-detail__error">No se encontró el evento.</p>;

  return (
    <div className="event-detail page page--event-detail">
      <Link to="/events" className="event-detail__back-link">← Volver a eventos</Link>

      <h2 className="event-detail__title">Detalle del Evento</h2>

      <div className="event-detail__info">
        <p><strong>ID:</strong> {event.id}</p>
        <p><strong>Tipo:</strong> {event.event_type}</p>
        <p><strong>Acción:</strong> {event.action}</p>
        <p><strong>Repositorio:</strong> {event.repo_full_name}</p>
        <p><strong>Usuario:</strong> {event.sender_login}</p>
        <p><strong>Commits:</strong> {event.commits_count}</p>
        <p><strong>Recibido:</strong> {new Date(event.received_at).toLocaleString()}</p>
        <p><strong>Procesado:</strong> {String(event.processed_status)}</p>
      </div>

      <button onClick={() => setIncludePayload((prev) => !prev)} className="event-detail__toggle">
        {includePayload ? 'Ocultar payload' : 'Mostrar payload'}
      </button>

      {includePayload && event.payload && (
        <pre className="event-detail__payload">{JSON.stringify(event.payload, null, 2)}</pre>
      )}
    </div>
  );
}