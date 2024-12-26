const { getMessagesForConversation, sendMessage } = require("./db"); // Import your database functions

module.exports.handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinConversation", async (conversationId) => {
      console.log(`User joined conversation ${conversationId}`);
      socket.join(conversationId);

      try {
        const messages = await getMessagesForConversation(conversationId);
        socket.emit("conversationMessages", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        socket.emit("error", "Failed to fetch messages");
      }
    });

    socket.on("sendMessage", async (data) => {
      const { conversationId, userId, message } = data;

      try {
        const newMessage = await sendMessage(conversationId, userId, message);

        io.to(conversationId).emit("newMessage", {
          id: newMessage.id,
          message: newMessage.message,
          created_at: newMessage.created_at,
          userId,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};
