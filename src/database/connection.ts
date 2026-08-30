import mongoose from "mongoose";
export const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/social-media");
    console.log("database connection successfully");
  } catch (error) {
    console.log("❌ database failed to connect");
  }
};
