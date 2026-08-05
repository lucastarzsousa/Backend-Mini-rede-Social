import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://seu-front.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

app.listen(3000, () => {});
