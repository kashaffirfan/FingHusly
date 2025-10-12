import Property from "../models/Property.js";
import multer from "multer";
import path from "path";

// ---------------- MULTER CONFIG ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// ---------------- CREATE PROPERTY ----------------
export const createProperty = async (req, res) => {
  try {
    const { title, location, price, description, agent } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !location || !price || !description || !agent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProperty = await Property.create({
      title,
      location,
      price,
      description,
      image,
      agent,
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("❌ Error creating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- GET ALL PROPERTIES BY AGENT ----------------
export const getAgentProperties = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const properties = await Property.find({ agent: agentId });
    res.json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- GET PROPERTY BY ID ----------------
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    console.error("❌ Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- UPDATE PROPERTY ----------------
export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { title, location, price, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { title, location, price, description };
    if (image) updateData.image = image;

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true }
    );

    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });

    res.json(updatedProperty);
  } catch (error) {
    console.error("❌ Error updating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== GET ALL PROPERTIES (for users) ====================
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("agent", "name email contact");
    res.json(properties);
  } catch (error) {
    console.error("❌ Error fetching all properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};
