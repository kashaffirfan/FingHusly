import express from "express";
import Agent from "../models/Agent.js";
import { protect, agentOnly } from "../middleware/auth.js";

const router = express.Router();

// Create agent profile (after user is registered as agent)
router.post("/", protect, agentOnly, async (req, res) => {
  const agent = new Agent({ user: req.user._id, ...req.body });
  const createdAgent = await agent.save();
  res.status(201).json(createdAgent);
});

// Get all agents
router.get("/", async (req, res) => {
  const agents = await Agent.find().populate("user", "name email");
  res.json(agents);
});

// Get single agent
router.get("/:id", async (req, res) => {
  const agent = await Agent.findById(req.params.id).populate("user", "name email");
  if (agent) res.json(agent);
  else res.status(404).json({ message: "Agent not found" });
});

export default router;
