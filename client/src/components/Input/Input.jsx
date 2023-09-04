import React, { useRef } from "react";
import cls from "./input.module.scss";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
  hidden,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder || ""}
      name={name || ""}
      value={value}
      onChange={onChange}
      className={`${cls.input} ${className || ""}  ${hidden ? cls.hidden : ""}`}
    />
  );
};

export default Input;
