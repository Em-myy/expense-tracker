import dotEnv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userAuthentication.js";
import expenseRoutes from "./routes/userExpense.js";

dotEnv.config();
const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

server.use("/api/authentication", userRoutes);
server.use("/api/expense", expenseRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
