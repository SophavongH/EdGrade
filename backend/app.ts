import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import classroomRoutes from "./routes/classroom"; // ✅ correct path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/classrooms", classroomRoutes); // ✅ changed from /classrooms to /api/classrooms

export default app;
