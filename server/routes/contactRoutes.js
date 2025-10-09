import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Create contact message
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json(contact);
});

// Get all contacts (Admin only later)
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

export default router;
