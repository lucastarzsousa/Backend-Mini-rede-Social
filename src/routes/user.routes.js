import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/perfil", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(404).json("Usuário não encontrado");
  }

  const { password, ...usuarioSemSenha } = user;

  res.json(usuarioSemSenha);
});

export default router;
