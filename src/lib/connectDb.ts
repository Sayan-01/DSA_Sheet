import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl as string);
    console.log("connect datbase");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;

//for call we write await connectDb()
