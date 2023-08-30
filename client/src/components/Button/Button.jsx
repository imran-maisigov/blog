import React from "react";
import cls from "./button.module.scss";
import { Link } from "react-router-dom";

const Button = ({ children, to, max, outline, className }) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`${cls.btn} ${(max && cls.max) || ""} ${
            (outline && cls.outline) || ""
          }`}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${cls.btn} ${(max && cls.max) || ""} ${
            (outline && cls.outline) || ""
          } ${className || ""}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
