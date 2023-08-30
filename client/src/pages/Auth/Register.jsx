import React from "react";
import cls from "./auth.module.scss";
import axios from "axios";

import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const form = e.target;

    const forma = new FormData(form);

    const formData = Object.fromEntries(forma);

    if (formData.password !== formData.rePassword) {
      return alert("Чувааак веди пароль");
    }

    try {
      delete formData.rePassword;

      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      navigate("/login");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={cls.auth}>
      <Title type="h1">Регистрация</Title>
      <Form className={cls.form_top} onSubmit={submitForm}>
        <Input type="text" placeholder="Имя" name="username" />
        <Input type="text" placeholder="Пароль" name="password" />
        <Input type="text" placeholder="Пароль" name="rePassword" />

        <Button max className={cls.auth_btn} type="submit">
          Зарегестрироваться
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
