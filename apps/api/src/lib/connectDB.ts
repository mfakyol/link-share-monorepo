import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI = "" } = process.env;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

async function connectDB() {
  const opts = {
    bufferCommands: false,
  };

  mongoose.connect(MONGODB_URI, opts).then((res) => console.log("[server]: Connected database."));
}

export default connectDB;
