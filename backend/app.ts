import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import classroomRoutes from "./routes/classroom"; 
import studentRoutes from "./routes/student";
import { authenticateJWT } from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/classrooms", authenticateJWT, classroomRoutes);
app.use("/api/students", authenticateJWT, studentRoutes);
export default app;
