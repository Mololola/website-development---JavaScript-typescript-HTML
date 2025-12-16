// models/Product.js

import mongoose from "mongoose";

const ProductImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
  colorCode: String, // to associate images with specific colors
});

const ProductColorSchema = new mongoose.Schema({
  name: String,
  code: String,
  available: { type: Boolean, default: true },
});

const ProductSizeSchema = new mongoose.Schema({
  size: String,
  available: { type: Boolean, default: true },
  inventory: { type: Number, default: 10 },
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  mrp: Number, // Original/marked price
  image: String, // Main product image (for backward compatibility)
  category: String,
  seller: String,
  businessId: { type: String, required: true }, // Add this field
  brand: String,
  color: String, // Default color (for backward compatibility)
  size: String, // Default size (for backward compatibility)
  isBestSeller: { type: Boolean, default: false },

  // Enhanced fields
  images: [ProductImageSchema],
  colors: [ProductColorSchema],
  sizes: [ProductSizeSchema],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
