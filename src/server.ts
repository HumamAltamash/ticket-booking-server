import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import moviesRoutes from "./routes/moviesRoutes";
import theatreRoutes from "./routes/theatreRoutes";
import cookieParser from "cookie-parser";
import { limiter } from "./middlewares/rateLimiter";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

app.use(limiter);

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theatre", theatreRoutes);

// Use PORT from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
