const express = require("express");
const http = require("http");
const db = require("./db");
const { getAllUsers, getUserByEmail } = require("./db"); // Import database functions
const path = require("path");
const authRoutes = require("./routes/auth"); // Import the auth routes from the correct path
const { handleSocketConnection } = require("./socketHandler");

const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = 4000;

// CORS setup for frontend
app.use(express.json()); // This is necessary to parse JSON in the body
app.use(cors({ origin: "http://localhost:5173" }));

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Listen for the send_message event from the frontend
//   socket.on("send_message", (msg) => {
//     console.log("Message received:", msg);

//     // Broadcast the message to all connected clients
//     // io.emit("receive_message", msg); // Emit the message to all clients
//   });

//   // Handle user disconnect
//   socket.on("disconnect", () => {
//     // console.log("User disconnected:", socket.id);
//   });
// });

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

handleSocketConnection(io);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const app = express();
// const http = require("http");
// const PORT = 4000;
// const db = require("./db");
// const cors = require("cors");
// const { getAllUsers, getUserByEmail } = require("./db"); // Import database functions
// // const socketIo = require("socket.io");

// const path = require("path");
// const { Server } = require("socket.io");
// const authRoutes = require("./routes/auth"); // Import the auth routes from the correct path
// const { handleSocketConnection } = require("./socketHandler");

// app.use(cors()); // Adjust based on your frontend URL

// // app.use(express.json()); // This is necessary to parse JSON in the body

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Listen for the send_message event from the frontend
//   socket.on("send_message", (msg) => {
//     console.log("Message received:", msg);

//     // Emit the message to all connected clients
//     io.emit("receive_message", msg); // Broadcast the message to everyone
//   });

//   // Handle user disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/auth", authRoutes); // All auth routes will be under '/auth'

// app.get("/users", async (req, res) => {
//   try {
//     const userList = await getAllUsers();
//     res.json(userList);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

// // handleSocketConnection(io);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
