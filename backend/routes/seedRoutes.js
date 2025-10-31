import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// Seed route to add mock products
router.post("/products", async (req, res) => {
  try {
    await Product.deleteMany({}); 

    const mockProducts = [
      {
        name: "Fresh Apples",
        price: 120,
        imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
        description: "Fresh and crispy red apples"
      },
      {
        name: "Bananas",
        price: 60,
        imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
        description: "Ripe yellow bananas"
      },
      {
        name: "Carrots",
        price: 40,
        imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
        description: "Fresh organic carrots"
      },
      {
        name: "Broccoli",
        price: 80,
        imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
        description: "Green fresh broccoli"
      },
      {
        name: "Milk",
        price: 55,
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
        description: "Fresh cow milk 1L"
      },
      {
        name: "Eggs",
        price: 90,
        imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
        description: "Farm fresh eggs (12 pieces)"
      },
      {
        name: "Bread",
        price: 35,
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
        description: "Whole wheat bread"
      },
      {
        name: "Chicken Breast",
        price: 220,
        imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
        description: "Boneless chicken breast 500g"
      },
      {
        name: "Rice",
        price: 85,
        imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
        description: "Basmati rice 1kg"
      },
      {
        name: "Tomatoes",
        price: 30,
        imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
        description: "Fresh red tomatoes"
      }
    ];

    const products = await Product.insertMany(mockProducts);
    res.json({ 
      message: "Mock products added successfully", 
      count: products.length,
      products 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;