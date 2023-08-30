import React from "react";
import cls from "./input.module.scss";

const Input = ({ type, placeholder, name, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder || ""}
      name={name || ""}
      value={value}
      onChange={onChange}
      className={`${cls.input} ${className || ""}`}
    />
  );
};

export default Input;
