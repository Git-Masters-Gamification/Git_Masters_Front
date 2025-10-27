import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TeamForm({ onCreate }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("El nombre del equipo es obligatorio.");
    if (name.length > 50)
      return setError("El nombre no puede superar los 50 caracteres.");

    setLoading(true);
    try {
      await onCreate(name.trim());
      setName("");
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) setError("Nombre inválido.");
      else if (status === 401)
        setError("Sesión expirada. Inicia sesión de nuevo.");
      else if (status === 403)
        setError("No tienes permisos para crear equipos.");
      else if (status === 409)
        setError(err.response?.data?.message || "Ya perteneces a un equipo.");
      else setError("Error interno. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="team-form bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="team-form__title text-lg font-semibold mb-4 text-gray-800">
        Crear nuevo equipo
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del equipo"
        disabled={loading}
        className="team-form__input w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {error && <p className="team-form__error text-red-500 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`team-form__button w-full py-2 rounded-md text-white ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Creando..." : "Crear equipo"}
      </button>
    </form>
  );
}

TeamForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};