import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    let imageUrl = "";

    if (req.file) {
      if (process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        imageUrl = upload.secure_url;
        fs.unlink(req.file.path, () => {});
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }
    }

    const product = await Product.create({ name, price, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};