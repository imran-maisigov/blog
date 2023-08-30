import React from "react";
import cls from "./form.module.scss";

const Form = ({ children, className, onSubmit }) => {
  return (
    <form
      className={`${cls.form} ${className || ""}`}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
