import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        console.log(" MongoDB already connected");
        return;
    }

    try {
        console.log(" Connecting to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // 15 sec timeout
        });
        isConnected = conn.connections[0].readyState;
        console.log(" MongoDB connection established");
    } catch (error) {
        console.error(" MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDb;
