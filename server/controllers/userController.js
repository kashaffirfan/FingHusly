import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  console.log("📩 Register request body:", req.body);
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    console.log("✅ User created successfully:", newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User created successfully", token, user: { id: newUser._id, name, email, role } });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ message: "Error creating account", error: error.message });
  }
};

//export const loginUser = async (req, res) => { ... }
