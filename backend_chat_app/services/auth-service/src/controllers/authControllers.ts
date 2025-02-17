import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Image saved at:", imagePath);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: imagePath,
    });

    // Save user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    user.is_online = "1"; // or user.is_online = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );

    // Send the token in response
    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.body?.userId;
    console.log("userId", userId, req?.body);

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    // Update user's online status
    const user = await User.findById(userId);
    if (user) {
      user.is_online = "0"; // or user.is_online = false;
      await user.save();
    }

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out" });
  }
};
