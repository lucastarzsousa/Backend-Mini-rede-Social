import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/auth.middleware.js";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/mensagem", authMiddleware, async (req, res) => {
  
  const { text } = req.body;

  const message = await prisma.message.create({
    data: {
      text: text,
      userId: req.user.id,
    },
  });

  res.status(201).json(message);
});

router.get("/mensagem", authMiddleware, async (req, res) => {
  const mensagens = await prisma.message.findMany({
    orderBy: {
      createdAt: "asc",
    },

    select: {
      id: true,
      text: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(mensagens);
});

export default router;
