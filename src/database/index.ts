import mongoose from "mongoose";
import dotenv from "dotenv";

let connection: typeof mongoose | null = null;

export const getDatabaseConnection = async () => {
  dotenv.config();

  const MONGODB_URI = process.env.MONGODB_URI as string | undefined;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (!connection) {
    console.info("Creating a new DB connection on the server-side...");

    connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    });
  } else console.info("Re-using created cached DB connection !");

  return connection;
};