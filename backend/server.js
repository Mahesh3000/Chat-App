const express = require("express");
const app = express();
const http = require("http");
const PORT = 4000;
const db = require("./db");
const cors = require("cors");
const { getAllUsers, getUserByEmail } = require("./db"); // Import database functions
const socketIo = require("socket.io");

const path = require("path");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth"); // Import the auth routes from the correct path
const { handleSocketConnection } = require("./socketHandler");

app.use(cors());

app.use(express.json()); // This is necessary to parse JSON in the body

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // or your specific frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    console.log("Joining conversation:", conversationId);
    socket.join(conversationId);
  });

  socket.on("sendMessage", (data) => {
    console.log("Message sent:", data);
    io.to(data.conversationId).emit("newMessage", data);
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes); // All auth routes will be under '/auth'

app.get("/users", async (req, res) => {
  try {
    const userList = await getAllUsers();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// handleSocketConnection(io);

// Initialize Socket.IO
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000", // Your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("send_message", (message) => {
//     io.emit("receive_message", { text: message, sender: "Server" });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
