import { Router } from "express";
import { getUser, login, logout, resetPassword, signup, verifyOtp } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { addToCart, checkOut, clearCart, decrementQuantity, getCart, incrementQuantity, removeFromCart } from "../controllers/FeatureController.js";

const router = Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.put("/reset-password", resetPassword)
router.put("/verify-otp", verifyOtp)
router.get("/get-user", verifyToken, getUser)

//FEATURE ROUTES
router.post("/add-to-cart/:id", addToCart)
router.get("/get-cart/:id", getCart)
router.delete("/remove-from-cart/:id", removeFromCart)
router.put("/increment-quantity/:id", incrementQuantity)
router.put("/decrement-quantity/:id", decrementQuantity)
router.get("/checkout", verifyToken, checkOut)
router.get("clear-cart", verifyToken, clearCart)



export default router