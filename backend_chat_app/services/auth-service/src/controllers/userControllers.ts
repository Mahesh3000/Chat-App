import { Request, Response } from "express";
import User from "../models/User"; // Ensure this path is correct

interface AuthRequest extends Request {
  user?: { id: string }; // Match the type from `authenticateToken`
}

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?.userId; // Get logged-in user ID

    if (!loggedInUserId) {
      return res.status(400).json({ message: "UnAuthorized" });
    }

    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .select("username email is_online image")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
