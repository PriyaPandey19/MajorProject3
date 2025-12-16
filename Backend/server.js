import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS ---
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://majorproject3-by3o.onrender.com"],
  credentials: true
}));

// --- JSON ---
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

// --- Serve Vite frontend build ---
// No cd needed — use absolute path from __dirname
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// --- MongoDB connection ---
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("FATAL: MONGODB_URL is not defined");
  process.exit(1);
}

mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 5000, family: 4 })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err.message));

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
