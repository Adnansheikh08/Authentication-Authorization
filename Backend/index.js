import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Controllers/authController.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", router);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    console.log("MONGO_URL =", process.env.MONGO_URL);
  });
