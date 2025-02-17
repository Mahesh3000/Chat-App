import mongoose, { Schema, Document } from "mongoose";

// Define the message schema
const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

interface IMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
