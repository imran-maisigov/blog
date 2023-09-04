import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  picture: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
    required: true,
  },
  createdAT: {
    type: Date,
    default: new Date(),
    required: true,
  },
  category: {
    type: String,
    default: "",
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
  username: {
    type: String,
    default: "",
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default new mongoose.model("Posts", postSchema);
