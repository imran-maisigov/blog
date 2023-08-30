import React from "react";
import cls from "./auth.module.scss";
import axios from "axios";

import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();

    const form = e.target;

    const forma = new FormData(form);

    const formData = Object.fromEntries(forma);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        dispatch({
          type: "AUTH",
          payload: {
            user: res.data.user,
            token: res.data.accessToken,
          },
        });
      }

      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={cls.auth}>
      <Title type="h1">Войти</Title>
      <Form className={cls.form_top} onSubmit={submitForm}>
        <Input type="text" placeholder="Имя" name="username" />
        <Input type="text" placeholder="Пароль" name="password" />

        <Button max className={cls.auth_btn} type="submit">
          Войти
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
