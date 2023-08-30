import React, { useEffect } from "react";
import cls from "./home.module.scss";
import Title from "../../components/Title/Title";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const HomePage = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/getPosts");

      dispatch({
        type: "ADD",
        payload: {
          posts: res.data,
        },
      });
    };

    getPosts();
  }, []);

  return (
    <section className={cls.home}>
      <Title type="h1" fs="24" fw="700">
        Unusual blog
      </Title>

      <section className={cls.articles}>
        {posts?.map((post) => {
          return (
            <ArticleCard
              key={post._id}
              id={post._id}
              title={post.title}
              description={post.description}
              createdAT={post.createdAT}
            />
          );
        })}
      </section>
    </section>
  );
};

export default HomePage;
