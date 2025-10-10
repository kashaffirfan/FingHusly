import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // your React app’s port (Vite uses 5173)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));
