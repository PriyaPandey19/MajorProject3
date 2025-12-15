import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: String,
    category: String,
    sections: { type: Array, default: [] },
    configData: Object,
    type: Number,
    activeItemId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", PortfolioSchema);
