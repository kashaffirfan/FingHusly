import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/mongoConnect.js";
import path from "path";
import { fileURLToPath } from "url";
import propertyRoutes from "./routes/propertyRoutes.js";
import { SpeedInsights } from "@vercel/speed-insights"

function App() {
  return (
    <div>
      {/* Your app content */}
      <SpeedInsights />
    </div>
  )
}

export default App



dotenv.config();
connectDB();
// Express app initialization must come before using 'app'
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static folder (for uploaded images)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes); 



// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
