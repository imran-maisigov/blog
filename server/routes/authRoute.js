import express from "express";
import authCtrl from "../controllers/authCtrl.js";
const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/getUser", authCtrl.getUser);

export default router;
