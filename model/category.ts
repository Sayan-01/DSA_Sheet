import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  info_path: String,
  order_idx: String,
  problems: [JSON],
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
