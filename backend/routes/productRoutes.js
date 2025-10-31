import express from "express";
import upload from "../utils/upload.js";
import { addProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Product routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, upload.single("image"), addProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;