// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) => {
  const btnClass = classNames(
    "btn",
    `btn--${variant}`,
    { "btn--disabled": disabled },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={btnClass}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline"]),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;