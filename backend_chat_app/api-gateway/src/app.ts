import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth"; // Auth routes
import cors from "cors"; // To handle cross-origin requests
import dotenv from "dotenv";
import { createServer } from "http";

dotenv.config();
const app = express();
// const server = http.createServer(app);
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Route Working!" });
});
const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log("Listening ", PORT);
});

export default app;

//   socket.on("setOnline", (userId) => {
//     console.log(`User ${userId} is now online`);
//     // Here, you can send a request to the Auth service to update the user status in DB
//     axios
//       .post("http://localhost:5001/api/auth/updateStatus", {
//         userId,
//         status: "online",
//       })
//       .then(() => {
//         socket.emit("userStatusUpdate", userId, "online");
//       })
//       .catch((error) => {
//         console.error("Error updating status:", error);
//       });
//   });

//   // Emit user offline status when they disconnect
//   socket.on("disconnect", () => {
//     if (socket.userId) {
//       console.log(`User ${socket.userId} is now offline`);
//       axios
//         .post("http://localhost:5001/api/auth/updateStatus", {
//           userId: socket.userId,
//           status: "offline",
//         })
//         .then(() => {
//           io.emit("userStatusUpdate", socket.userId, "offline");
//         })
//         .catch((error) => {
//           console.error("Error updating status:", error);
//         });
//     }
//   });
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth";

// // dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);

// export default app;
