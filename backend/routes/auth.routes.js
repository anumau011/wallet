import { Router } from "express";
import { signup, login, verifyUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyUser);

export default router;
