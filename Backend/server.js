import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = 8080;


app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.listen(port, () => {
	console.log(`Server is running on ${port}`);
	connectDB();
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Database", err);
    }
}