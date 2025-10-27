// src/modules/rules-points/components/RulesActivityForm.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../../services/api";
import API from "../../../services/endpoints";

export default function RulesActivityForm({ onSubmit }) {
  const [form, setForm] = useState({
    ruleKey: "",
    user: "",
    points: "",
    entityId: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!import.meta.env.DEV) {
    return (
      <p className="rules-form__dev-warning">
        Este formulario solo está disponible en modo desarrollo.
      </p>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.ruleKey.trim())
      return setError("El campo 'Rule Key' es obligatorio.");
    if (!form.user.trim())
      return setError("El campo 'Usuario' es obligatorio.");
    if (!form.points || isNaN(form.points))
      return setError("El campo 'Puntos' debe ser un número válido.");

    setLoading(true);

    try {
      const payload = {
        ruleKey: form.ruleKey.trim(),
        user: form.user.trim(),
        points: Number(form.points),
        entityId: form.entityId.trim() || null,
      };

      const res = onSubmit
        ? await onSubmit(payload)
        : await api.post(API.RULES_POINTS.ACTIVITY, payload);

      setResult({ success: true, data: res.data ?? res });
      setForm({ ruleKey: "", user: "", points: "", entityId: "" });
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) setError("Datos inválidos.");
      else if (status === 401)
        setError("Sesión expirada. Inicia sesión nuevamente.");
      else if (status === 403)
        setError("No tienes permisos para realizar esta acción.");
      else if (status === 409)
        setError(err.response?.data?.message || "Conflicto detectado.");
      else setError("Error interno. Intenta nuevamente.");

      setResult({
        success: false,
        error: err.response?.data || err.message || "Error desconocido",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="rules-form" onSubmit={handleSubmit}>
      <h3 className="rules-form__title">Registrar Actividad (modo Dev)</h3>

      <div className="rules-form__row">
        <label htmlFor="ruleKey" className="rules-form__label">Rule Key</label>
        <input
          id="ruleKey"
          name="ruleKey"
          value={form.ruleKey}
          onChange={handleChange}
          placeholder="Ej: PUSH_COMMIT"
          required
          className="rules-form__input"
        />
      </div>

      <div className="rules-form__row">
        <label htmlFor="user" className="rules-form__label">Usuario</label>
        <input
          id="user"
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="username"
          required
          className="rules-form__input"
        />
      </div>

      <div className="rules-form__row">
        <label htmlFor="points" className="rules-form__label">Puntos</label>
        <input
          id="points"
          name="points"
          type="number"
          value={form.points}
          onChange={handleChange}
          placeholder="Ej: 50"
          required
          className="rules-form__input"
        />
      </div>

      <div className="rules-form__row">
        <label htmlFor="entityId" className="rules-form__label">Entity ID</label>
        <input
          id="entityId"
          name="entityId"
          value={form.entityId}
          onChange={handleChange}
          placeholder="Opcional"
          className="rules-form__input"
        />
      </div>

      {error && (
        <p className="rules-form__error">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rules-form__button"
      >
        {loading ? "Enviando..." : "Registrar"}
      </button>

      {result && (
        <div
          className={`rules-form__result ${
            result.success ? "rules-form__result--success" : "rules-form__result--error"
          }`}
        >
          {result.success ? (
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          ) : (
            <p>Error: {JSON.stringify(result.error)}</p>
          )}
        </div>
      )}
    </form>
  );
}

RulesActivityForm.propTypes = {
  onSubmit: PropTypes.func,
};