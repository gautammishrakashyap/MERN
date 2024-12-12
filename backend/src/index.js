import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server is running on PORT~ ${PORT}`);
    connectDB();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    app.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    app.close(() => process.exit(1));
});
