import express from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js"; // Ensure .js extension

const router = express.Router();

// POST route for signup
router.post("/signup", signup);

// POST route for login
router.post("/login", login);

// POST route for logout
router.post("/logout", logout);

export default router;
