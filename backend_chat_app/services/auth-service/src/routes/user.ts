import express from "express";
import { getUsers } from "../controllers/userControllers";
import { authenticateToken } from "../middleware/authMiddleware"; // Middleware for authentication

const router = express.Router();

// Get all users except the logged-in user
router.get("/users", authenticateToken, getUsers);

export default router;
