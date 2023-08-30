import React from "react";
import cls from "./dropdown.module.scss";

import avatarImg from "./../../assets/avatar.jpg";
import arrowImg from "./../../assets/arrow.svg";

const DropDown = () => {
  return (
    <button className={cls.button}>
      <img src={avatarImg} alt="user avatar" className={cls.avatar} />
      <img src={arrowImg} alt="arrow" className={cls.arrow} />
    </button>
  );
};

export default DropDown;
