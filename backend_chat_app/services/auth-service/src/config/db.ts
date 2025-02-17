import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();



const mongoURI = process.env.MONGO_URI as string;


export const connectDB = async () => {  
   mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
};
