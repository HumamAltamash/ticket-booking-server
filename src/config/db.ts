import mongoose from "mongoose";

const dbURL: string = process.env.DB_URL as string;
if (!dbURL) {
  throw new Error("DB_URL is not defined in the environment variables");
}

const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB with additional options
    await mongoose.connect(dbURL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB", err);
  }
};

export default connectDB;
