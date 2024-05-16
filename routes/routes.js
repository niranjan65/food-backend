import { Router } from "express";
import { getUser, login, logout, resetPassword, signup, verifyOtp } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.put("/reset-password", resetPassword)
router.put("/verify-otp", verifyOtp)
router.get("/get-user", verifyToken, getUser)

export default router