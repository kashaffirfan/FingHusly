import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ========================== REGISTER ==========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, contact } = req.body;
    const photo = req.file ? req.file.filename : null; // ✅ handle uploaded file

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user with photo field
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role?.toLowerCase() || "user",
      contact,
      photo, // ✅ store uploaded filename
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================== LOGIN ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Incoming login:", { email, password });

    const user = await User.findOne({ email });
    console.log("🟡 Found user:", user);

    if (!user) {
      console.log("❌ No user found with that email");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🟡 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role.toLowerCase(), // ✅ correct
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, contact, role } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updateData = { name, email, contact, role };
    if (photo) updateData.photo = photo;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Use req.body for text fields; req.file for photo
    const { name, email, contact, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (req.file) user.photo = req.file.filename;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
      role: updatedUser.role,
      photo: updatedUser.photo || null,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};


// ========================== GET USER BY ID ==========================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================== SEND NOTIFICATION ==========================
export const sendNotification = async (req, res) => {
  try {
    const { agentId, message } = req.body;
    console.log(`📩 Notification for Agent(${agentId}): ${message}`);
    res.status(200).json({ message: "Notification sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    res.status(500).json({ message: "Server error" });
  }
};
