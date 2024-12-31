const { sendMessage, getMessagesForConversation } = require("./db");

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining a conversation room
    // socket.on("join_conversation", async ({ senderId, receiverId }) => {
    //   const conversationId = [senderId, receiverId].sort().join("-");
    //   console.log("conversationId", conversationId);

    //   socket.join(conversationId);

    //   console.log(`User ${socket.id} joined conversation: ${conversationId}`);

    //   // Send previous messages to the user who just joined
    //   const messages = await getMessagesForConversation(senderId, receiverId);
    //   socket.emit("load_messages", messages);
    // });

    socket.on("join_conversation", async ({ senderId, receiverId }) => {
      if (!senderId || !receiverId) {
        console.error("Invalid senderId or receiverId", {
          senderId,
          receiverId,
        });
        socket.emit("error", { message: "Invalid conversation IDs." });
        return;
      }

      const conversationId = [senderId, receiverId].sort().join("-");
      socket.join(conversationId);
      console.log(`User ${socket.id} joined conversation: ${conversationId}`);

      // Send previous messages to the user who just joined
      const messages = await getMessagesForConversation(senderId, receiverId);
      socket.emit("load_messages", messages);
    });

    // Handle sending a message
    socket.on("send_message", async ({ senderId, receiverId, message }) => {
      try {
        const newMessage = await sendMessage(senderId, receiverId, message);

        // Send the message to the specific receiver
        io.to(receiverId).emit("receive_message", newMessage);
        io.to(senderId).emit("receive_message", newMessage); // Send to sender too

        // Optionally, acknowledge the sender
        socket.emit("message_sent", newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = { handleSocketConnection };
