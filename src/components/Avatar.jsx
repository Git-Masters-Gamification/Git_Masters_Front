// src/components/Avatar.jsx
import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ src, name = "?", size = 48 }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .slice(0, 2)
        .join("")
    : "?";

  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {src ? (
        <img src={src} alt={name} className="avatar__img" />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};

export default Avatar;