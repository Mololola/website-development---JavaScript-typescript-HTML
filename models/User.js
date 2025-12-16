// models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ["user", "business"], required: true },
  website: String,
  bio: String,
  phone: String,
  address: String,
  // Add image fields
  logoUrl: String,
  bannerUrl: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
