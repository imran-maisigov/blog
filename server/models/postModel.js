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
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});

export default new mongoose.model("Posts", postSchema);
