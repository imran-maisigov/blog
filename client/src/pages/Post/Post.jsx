import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Post = () => {
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const getOnePost = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/post/${params.id}`
      );

      dispatch({
        type: "VIEW",
        payload: {
          post: res.data,
        },
      });
    };

    getOnePost();
  }, [params.id]);

  console.log(post);

  return <div>{post?.title}</div>;
};

export default Post;
