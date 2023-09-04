import React from "react";
import cls from "./articlesCard.module.scss";
import dotsImg from "../../assets/dots.svg";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Title from "../Title/Title";
import axios from "axios";

const ArticleCard = ({ id, title, description, createdAT }) => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const deletePost = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/post/${id}`);

    if (res.data) {
      const newPosts = posts.filter((post) => post._id !== res.data._id);

      dispatch({
        type: "ADD",
        payload: {
          posts: newPosts,
        },
      });
    }
  };

  return (
    <div className={cls.article_card}>
      <Title type="h2" fs="24" fw="700">
        <Link to={`/detail/${id}`} className={cls.title}>
          {title}
        </Link>
      </Title>

      <button className={cls.dots_btn} onClick={onOpen}>
        <img src={dotsImg} alt="dots" />
      </button>

      {isOpen && (
        <ul className={cls.menu}>
          <li>
            <button className={cls.menu_btn} onClick={() => deletePost(id)}>
              Удалить
            </button>
          </li>

          <li>
            <button className={cls.menu_btn}>Скопировать ссылку</button>
          </li>
        </ul>
      )}

      <Title type="p" fs="12" fw="700">
        <Link to={`/detail/${id}`} className={cls.date}>
          {createdAT}
        </Link>
      </Title>

      <Title type="p" fs="16" fw="700">
        <Link to={`/detail/${id}`} className={cls.text}>
          {description}
        </Link>
      </Title>
    </div>
  );
};

export default ArticleCard;
