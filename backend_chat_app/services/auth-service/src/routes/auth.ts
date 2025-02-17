import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/authControllers";
import upload from "../middleware/upload";

const router = express.Router();

// Register User
router.post("/register", upload.single("image"), registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser); // No authentication required

router.get("/", async (req, res) => {
  res.json("i am working");
});

export default router;
