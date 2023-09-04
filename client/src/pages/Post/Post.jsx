import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cls from "./post.module.scss";
import Title from "../../components/Title/Title";
import likeImg from "../../assets/like.svg";
import likeActiveImg from "../../assets/like-active.svg";
import eyesImg from "../../assets/eyes.svg";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const Post = () => {
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const getOnePost = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/post/${params.id}`
      );

      if (res.data) {
        dispatch({
          type: "VIEW",
          payload: {
            post: res.data,
          },
        });
      }
    };

    getOnePost();
  }, []);

  const likePost = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/post/${params.id}`,
        { likes: [] },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const isLike = post?.likes?.include(user?._id);

  // console.log(post);

  return (
    <section className={cls.home}>
      <article className={cls.post_main}>
        {post?.picture && <img src={post?.picture} alt="post img" />}

        <div className={cls.content}>
          <Title type="h2" fs="24" fw="700">
            {post?.title}
          </Title>

          <Title type="p" fw="700" fs="14" className={cls.grey}>
            {post?.createdAT}
          </Title>

          <Title type="p" className={cls.text}>
            {post?.description}
          </Title>
        </div>

        <div className={cls.post_info}>
          <div className={cls.post_user}>{post?.username}</div>

          <div className={cls.post_buttons}>
            <button onClick={likePost}>
              <img src={post ? likeActiveImg : likeImg} alt="like" />
              <p>{post?.likes?.length}</p>
            </button>

            <button>
              <img src={eyesImg} alt="views" />
              <p>{post?.views}</p>
            </button>
          </div>
        </div>
      </article>

      <section className={cls.articles}>
        {/* {posts?.map((post) => {
          return (
            <ArticleCard
              key={post._id}
              id={post._id}
              title={post.title}
              description={post.description}
              createdAT={post.createdAT}
            />
          );
        })} */}
      </section>
    </section>
  );
};

export default Post;
