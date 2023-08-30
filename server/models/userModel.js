import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
});

export default new mongoose.model("Users", userSchema);
