import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes (JWT authentication)
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// Only allow agents
export const agentOnly = (req, res, next) => {
  if (req.user && req.user.role === "agent") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Agents only." });
  }
};
