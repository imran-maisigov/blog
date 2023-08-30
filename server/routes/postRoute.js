import express from "express";
import postCtrl from "../controllers/postCtrl.js";

const router = express.Router();

router.post("/createPost", postCtrl.createPost);
router.get("/getPosts", postCtrl.getPosts);
router.get("/post/:id", postCtrl.getOnePost);

export default router;
