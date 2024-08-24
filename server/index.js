import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authoRouts from "./Routes/auth.route.js";
import connectToMonogoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true, // Replace with your frontend URL
  })
);

app.use("/api/auth", authoRouts);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectToMonogoDB();
  console.log(`port ${PORT}`);
});
