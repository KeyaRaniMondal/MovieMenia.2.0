import { Router } from "express";
import { signup, login, fetchUser, logout, googleLogin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/fetch-user", fetchUser);
router.post("/logout", logout);

export default router;
