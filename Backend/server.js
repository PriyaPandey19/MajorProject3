import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolio.js";

// --- Add these imports for serving React build ---
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// --- Enable CORS before routes ---
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // allow both dev ports
  credentials: true
}));

// --- Parse JSON ---
app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);


// --- Serve React frontend build ---
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // adjust path if your build folder is elsewhere

// --- React routing: send index.html for any unknown route ---
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html")); 
});

// --- MongoDB connection ---
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("FATAL error: MONGODB_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 5000, family: 4 })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err.message));

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Server is ready to communicate with the React App!");
});
