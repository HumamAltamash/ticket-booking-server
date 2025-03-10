import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// Use routes
app.use("/api/auth", authRoutes);

// Use PORT from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
