import express from "express";
import authCtrl from "../controllers/authCtrl.js";
const router = express.Router();

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.get("/getUser", authCtrl.getUser);

export default router;
