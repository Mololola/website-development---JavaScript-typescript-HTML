// app/api/auth/register-user/route.js

import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Missing email or password" }),
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

  const newUser = new User({
    email,
    password: hashed,
    role: "user",
  });

  await newUser.save();

  return new Response(
    JSON.stringify({ message: "User created successfully" }),
    { status: 201 }
  );
}
