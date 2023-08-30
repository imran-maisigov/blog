import React from "react";
import { Link } from "react-router-dom";
import cls from "./header.module.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../DropDown/DropDown";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.wrapper}>
          <Link to="/" className={cls.logo}></Link>

          <div className={cls.btns}>
            {user ? (
              <>
                <Button to="/addPost">Добавить пост</Button>
                <DropDown />
              </>
            ) : (
              <>
                <Button to="/login">Войти</Button>
                <Button to="/register" outline>
                  Регистрация
                </Button>
              </>
            )}
          </div>
          {/* ./wrapper */}
        </div>
        {/* ./container */}
      </div>
    </header>
  );
};

export default Header;
