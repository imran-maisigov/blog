import React from "react";
import cls from "./articlesCard.module.scss";
import dotsImg from "../../assets/dots.svg";

import { Link } from "react-router-dom";
import Title from "../Title/Title";

const ArticleCard = ({ id, title, description, createdAT }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cls.article_card}>
      <Title type="h1" fs="24" fw="700">
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
            <button className={cls.menu_btn}>Удалить</button>
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
