import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token)
      return res.status(401).json({ message: "Пожалуйста зайдите в систему" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Пожалуйста зайдите в систему" });

      const user = await Users.findOne({ _id: result.id });

      if (!user) return res.status(401).json({ message: "Зарегестрируйтесь" });

      req.user = user;

      next();
    });
  } catch (err) {
    console.log(err);
  }
};
