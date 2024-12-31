const { sendMessage, getMessagesForConversation } = require("./db");

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    // console.log("A user connected:", socket.id);

    // Handle joining a conversation room
    socket.on("join_conversation", async (conversationId) => {
      try {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation ${conversationId}`);

        // Optionally, send previous messages to the user who just joined
        const messages = await getMessagesForConversation(conversationId);
        socket.emit("load_messages", messages); // Send the message history to the client
      } catch (error) {
        console.error("Error loading messages:", error);
        socket.emit("error", {
          message: "Failed to load conversation history.",
        });
      }
    });

    // Handle sending a message
    socket.on("send_message", async ({ senderId, receiverId, message }) => {
      try {
        // Save message to the database
        const newMessage = await sendMessage(senderId, receiverId, message);

        // Send the message to the specific receiver
        io.to(receiverId).emit("receive_message", newMessage);

        // Optionally, acknowledge the sender
        socket.emit("message_sent", newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    // Handle message history with pagination (Optional)
    socket.on("get_messages", async ({ userId, otherUserId }) => {
      try {
        const messages = await getMessagesForConversation(userId, otherUserId);
        socket.emit("load_messages", messages);
        console.error("Error fetching messages:", messages);
      } catch (error) {
        socket.emit("error", { message: "Failed to load messages." });
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = { handleSocketConnection };
