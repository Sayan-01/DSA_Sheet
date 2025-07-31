import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    external_link: String,
    difficulty: String,
    pattern_id: String,
    order_idx: String,
  },
  { _id: false }
);

// Only create the model here if needed independently
const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);
export default Question;
