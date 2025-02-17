import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message:{
        type:String,
        required:true,
      }
  },
  { timestamps: true }
);

const Message = mongoose.model("User", ChatSchema);
export default Message;
