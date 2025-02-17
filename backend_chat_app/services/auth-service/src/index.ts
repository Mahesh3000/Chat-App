import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
const router = express.Router();
const PORT = process.env.PORT || 5001;
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import * as chatController from "./controllers/chatControllers";

connectDB();
dotenv.config();
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Auth Service Running!" });
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Emit messages when a user joins
  socket.on("fetch-messages", async ({ currentUserId, otherUser }) => {
    try {
      const messages = await chatController.fetchMessages({
        currentUserId,
        otherUser,
      });
      socket.emit("messages", messages); // Send messages to client
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  // Listen for sending messages
  socket.on("send-message", async ({ senderId, receiverId, message }) => {
    try {
      await chatController.saveMessage(senderId, receiverId, message); // Save to MongoDB
      io.to(receiverId).emit("receive-message", {
        senderId,
        receiverId,
        message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("running at  ", PORT);
});

// io.on("connection", (socket) => {
//   console.log("socket.id", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//   });
// });
