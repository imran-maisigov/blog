import Posts from "../models/postModel.js";

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const post = req.body;

      const newPost = await Posts.create(post);

      res.json(newPost);
    } catch (err) {
      console.log(err);
    }
  },

  getPosts: async (req, res) => {
    try {
      const Post = await Posts.find();

      res.json(Post);
    } catch (err) {
      console.log(err);
    }
  },

  getOnePost: async (req, res) => {
    const postId = req.params.id;

    const post = await Posts.findById({ _id: postId });

    res.json(post);
  },
};

export default postCtrl;
