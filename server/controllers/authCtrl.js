import mongoose from "mongoose";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username });

      if (user) return res.status(400).json({ message: "Вы уже в системе!" });

      if (password.length < 6) {
        return res.status(400).json({ message: "Недостаточная длина пароля!" });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = await Users.create({
        ...req.body,
        password: hashPassword,
      });

      return res.json(newUser);
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username });
      if (!user)
        return res
          .status(400)
          .json({ message: "Неправильный логин или пароль!" });

      const isCorrect = await bcrypt.compare(password, user.password);

      if (!isCorrect) {
        return res
          .status(400)
          .json({ message: "Неправильный логин или пароль!" });
      }

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Успешный вход",
        user,
        accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const rfToken = req.cookies.refreshtoken;

      if (!rfToken)
        return res.status(400).json({ message: "Пожалуйста войдите" });

      jwt.verify(
        rfToken,
        process.env.REFRESH_TOKEN_SECRET,

        async (err, result) => {
          if (err) res.json({ message: "Пожалуйста войдите" });

          const user = await Users.findById({ _id: result.id });

          const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({ user, accessToken });
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};

export default authCtrl;
