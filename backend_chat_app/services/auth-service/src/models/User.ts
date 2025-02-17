import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_online: { type: String, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
