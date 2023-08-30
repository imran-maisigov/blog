import React from "react";
import cls from "./title.module.scss";

const Title = ({ children, type, className, fs, fw }) => {
  const sizeClasses = {
    12: cls.size12,
    14: cls.size14,
    16: cls.size16,
    24: cls.size24,
  };

  const weightClasses = {
    400: cls.weight400,
    700: cls.weight700,
  };

  return (
    <>
      {type === "h1" && (
        <h1
          className={`${className || ""} ${weightClasses[fw]} ${
            sizeClasses[fs]
          }`}
        >
          {children}
        </h1>
      )}

      {type === "h2" && (
        <h2
          className={`${className || ""} ${weightClasses[fw]} ${
            sizeClasses[fs]
          }`}
        >
          {children}
        </h2>
      )}

      {type === "p" && (
        <p
          className={`${className || ""} ${weightClasses[fw]} ${
            sizeClasses[fs]
          }`}
        >
          {children}
        </p>
      )}

      {type === "span" && (
        <span
          className={`${className || ""} ${weightClasses[fw]} ${
            sizeClasses[fs]
          }`}
        >
          {children}
        </span>
      )}
    </>
  );
};

export default Title;
