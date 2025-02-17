import { Request, Response } from "express";
import Message from "../models/messageModal";

// Fetch previous messages between two users
export const fetchMessages = async (req: Request, res: Response) => {
  const { currentUserId, otherUserId } = req.body;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp (ascending)

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Save a new message
export const saveMessage = async (
  senderId: string,
  receiverId: string,
  message: string
) => {
  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();
  } catch (error) {
    console.error("Error saving message:", error);
  }
};
