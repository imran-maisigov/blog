import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ------multer

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// ------multer-end

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Сервер подкючен к БД"))
  .catch((err) => console.log(err));

app.use("/api", authRoute);
app.use("/api", postRoute);

app.listen(PORT, () => {
  console.log(`Сервер работает на порте ${PORT}...`);
});
