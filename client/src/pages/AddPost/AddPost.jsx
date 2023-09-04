import React, { useRef, useState } from "react";
import cls from "./addpost.module.scss";
import Card from "../../components/Card/Card";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import axios from "axios";
import plusImg from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);

      const res = await axios.post("http://localhost:5000/upload", formData);

      console.log(res);
      setImageUrl(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const formKeys = Object.fromEntries(formData);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/createPost",
        {
          ...formKeys,
          picture: `http://localhost:5000${imageUrl}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={cls.wrapper}>
      <Title type="h1" fs="24" fw="700">
        Добавить Пост
      </Title>

      <Form onSubmit={onSubmit}>
        <button
          onClick={() => inputFileRef.current.click()}
          className={cls.imgBtn}
        >
          {imageUrl ? (
            <img src={`http://localhost:5000${imageUrl}`} />
          ) : (
            <>
              <img src={plusImg} alt="add img" />
              <p>Добавить файл(ы)</p>
            </>
          )}
        </button>

        <input
          ref={inputFileRef}
          onChange={handleChangeFile}
          type="file"
          hidden
        />

        <Input type="text" placeholder="Введите название поста" name="title" />

        <select className={cls.select} name="category">
          <option value="Категория невыбранна">Выберите категорию</option>
          <option value="Спорт">Спорт</option>
          <option value="Программирование">Программирование</option>
        </select>

        <textarea
          name="description"
          placeholder="Введите описание поста"
          className={cls.textPost}
        ></textarea>

        <Button max className={cls.addBtn} type="submit">
          Добавить
        </Button>
      </Form>
    </Card>
  );
};

export default AddPost;
