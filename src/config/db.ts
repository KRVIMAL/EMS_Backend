import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
const mongoURL: any = process.env.MONGO_URL;
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(mongoURL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
