import express from "express";
import Property from "../models/Property.js";
import { protect, agentOnly } from "../middleware/auth.js";

const router = express.Router();

// Create property (Agent only)
router.post("/", protect, agentOnly, async (req, res) => {
  const property = new Property({ agent: req.user._id, ...req.body });
  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// Get all properties
router.get("/", async (req, res) => {
  const properties = await Property.find().populate("agent", "name email");
  res.json(properties);
});

// Get single property
router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id).populate("agent", "name email");
  if (property) res.json(property);
  else res.status(404).json({ message: "Property not found" });
});

// Update property (Agent only)
router.put("/:id", protect, agentOnly, async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    Object.assign(property, req.body);
    const updated = await property.save();
    res.json(updated);
  } else res.status(404).json({ message: "Property not found" });
});

// Delete property (Agent only)
router.delete("/:id", protect, agentOnly, async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    await property.remove();
    res.json({ message: "Property removed" });
  } else res.status(404).json({ message: "Property not found" });
});

export default router;
