import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      console.error("MONGO_URI is not defined. Skipping MongoDB connection.");
      return;
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    // In a serverless environment, exiting the process will cause the
    // function to crash with a 500. Instead, log the error and let the
    // function continue so non-DB routes (like /api/chat/token) still work.
    console.error("Error connecting to MongoDB:", error);
  }
};