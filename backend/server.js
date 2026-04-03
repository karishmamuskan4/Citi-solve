import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("CitiSolve API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
