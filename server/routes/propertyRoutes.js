import express from "express";
import { updateProperty } from "../controllers/propertyController.js";
import { createProperty, getAgentProperties, getPropertyById, upload, getAllProperties } from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", upload.single("image"), createProperty);
router.get("/agent/:agentId", getAgentProperties);
router.get("/", getAllProperties); 
router.put("/:id", upload.single("image"), updateProperty);
router.get("/:id", getPropertyById);

export default router;
