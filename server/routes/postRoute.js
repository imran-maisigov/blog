import express from "express";
import postCtrl from "../controllers/postCtrl.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/createPost", isAuth, postCtrl.createPost);
router.get("/getPosts", postCtrl.getPosts);
router.get("/post/:id", postCtrl.getOnePost);
router.patch("/post/:id", isAuth, postCtrl.likePost);

router.delete("/post/:id", postCtrl.deletePost);

export default router;
