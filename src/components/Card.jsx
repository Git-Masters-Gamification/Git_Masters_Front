// src/components/Card.jsx
import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card__header">{title}</div>}
      <div className="card__content">{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;