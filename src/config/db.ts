import "dotenv/config";
import mongoose from "mongoose";

const db = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI as string);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
export { db };
