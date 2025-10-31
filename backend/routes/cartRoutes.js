import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cart routes
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;
// router.post("/checkout", Auth, checkout);

