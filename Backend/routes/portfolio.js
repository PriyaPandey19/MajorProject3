import express from "express";
import { v4 as uuidv4 } from "uuid";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, title, category, projectContent, sections, configData, portfolioId, type } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: "UserId and title are required" });
    }

    let savedPortfolio;

    if (portfolioId) {
      const existingPortfolio = await Portfolio.findById(portfolioId);
      if (!existingPortfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      existingPortfolio.title = title;
      existingPortfolio.category = category;
      existingPortfolio.projectContent = projectContent;
      existingPortfolio.sections = sections || [];
      existingPortfolio.configData = configData;
      existingPortfolio.type = type ?? existingPortfolio.type;

      savedPortfolio = await existingPortfolio.save();
    } else {
      savedPortfolio = await Portfolio.create({
        userId,
        title,
        category,
        projectContent,
        sections: sections || [],
        configData,
        type: type || 0,
      });
    }

    res.status(200).json(savedPortfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Get all portfolios of a user ---
router.get("/user/:userId", async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.params.userId });
    res.status(200).json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});






// --- Get all portfolios ---
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});




// --- Delete one portfolio by ID ---
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Portfolio not found" });

    console.log("Deleted portfolio:", req.params.id);
    res.status(200).json({ message: "Deleted successfully", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Delete all portfolios of a user ---
router.delete("/user/:userId", async (req, res) => {
  try {
    const result = await Portfolio.deleteMany({ userId: req.params.userId });
    console.log(`Deleted ${result.deletedCount} portfolios for user ${req.params.userId}`);
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
