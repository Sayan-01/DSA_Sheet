// models/Category.js
const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  external_link: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  pattern_id: { type: String, required: true },
  order_idx: { type: String, required: true },
  todo: { type: Boolean, default: false },
  isComplete: { type: Boolean, default: false },
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  info_path: { type: String, required: true },
  order_idx: { type: String, required: true },
  total_solve: { type: Number, default: 0 },
  problems: [ProblemSchema],
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;