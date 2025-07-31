import mongoose from "mongoose";
import { data } from "../data/index";
import Question from "../../model/question";
import Category from "../../model/category";

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dsa-sheet");
    console.log("Connected to MongoDB");

    // Clear existing data
    await Question.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data");

    // Process each category
    for (const categoryId in data) {
      const categoryData = data[categoryId];
      
      // Create questions for this category
      const questionPromises = categoryData.problems.map(async (problem) => {
        const question = new Question(problem);
        await question.save();
        return question._id;
      });
      
      // Wait for all questions to be created
      const questionIds = await Promise.all(questionPromises);
      
      // Create category with question references
      const category = new Category({
        ...categoryData,
        problems: questionIds
      });
      
      await category.save();
      console.log(`Successfully imported category: ${categoryData.name} with ${questionIds.length} questions`);
    }

    console.log("Data import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
}

importData();
