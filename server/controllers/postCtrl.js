import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const post = {
        ...req.body,
        username: req.user.username,
        userID: req.user._id,
      };

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

    const post = await Posts.findByIdAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } }
    );

    res.json(post);
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);

      const user = await Users.findById(req.user._id);

      if (!post.likes.includes(user._id)) {
        const newPost = await Posts.findOneAndUpdate(post._id, {
          $push: {
            likes: user._id,
          },
        });
        res.json({ message: "Успешный лайк", newPost });
      } else {
        const newPost = await Posts.findByIdAndUpdate(post._id, {
          $pull: {
            likes: user._id,
          },
        });
        res.json({ message: "Успешный дизлайк", newPost });
      }
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Posts.findByIdAndDelete(req.params.id);

      res.json(post);
    } catch (err) {
      console.log(err);
    }
  },
};

export default postCtrl;
