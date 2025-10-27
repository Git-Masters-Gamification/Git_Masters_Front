// src/components/Loader.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Loader({ message = 'Cargando...' }) {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <div className="loader" aria-busy="true">
        {message}
      </div>
    </div>
  );
}

// ✅ Validación de props
Loader.propTypes = {
  message: PropTypes.string,
};