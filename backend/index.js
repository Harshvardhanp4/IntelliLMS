import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send("Hello from server!");
});

const startServer = async () => {
    await connectDb(); // ✅ Connect DB BEFORE routes and server start
    console.log("✅ DB connected. Starting server...");

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/course", courseRouter);
    app.use("/api/order", paymentRouter);
    app.use("/api/review", reviewRouter);

    app.listen(port, () => {
        console.log(`🚀 Server running on PORT ${port}`);
    });
};

startServer();
