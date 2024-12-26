const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB, getUserByEmail, insertUser } = require("../db");
const multer = require("multer");
const path = require("path");

const router = express.Router();

connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  },
});

const upload = multer({
  storage,
  //   fileFilter: (req, file, cb) => {
  //     if (file.mimetype.startsWith("image/")) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("Only image files are allowed"), false);
  //     }
  //   },
  //   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

router.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log("Received data:", req.body);

  const { username, email, password, confirmPassword } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null; // Handle profilePic URL if a file is uploaded

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if essential fields are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  try {
    // Check if user already exists
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await insertUser(
      username,
      email,
      hashedPassword,
      profilePic
    );

    // Respond with success message
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profile_pic, // Include profile pic URL if available
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await getUserByEmail(email);
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profile_pic,
        createdAt: user.created_at,
      },
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage });

//   router.post("/profile", upload.single("file"), function (req, res, next) {
//     // return res.json({req.file});
//     return res.json({ message: "File uploaded successfully" });
//   });
