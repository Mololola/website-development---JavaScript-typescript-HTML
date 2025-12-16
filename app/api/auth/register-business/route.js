// app/api/auth/register-business/route.js

import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, businessName, website, bio } = await req.json();

  if (!email || !password || !businessName) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "Email already in use" }), {
      status: 409,
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newBusiness = new User({
    email,
    password: hashed,
    role: "business",
    name: businessName,
    website: website || "",
    bio: bio || "",
  });

  await newBusiness.save();

  return new Response(JSON.stringify({ message: "Business account created" }), {
    status: 201,
  });
}
