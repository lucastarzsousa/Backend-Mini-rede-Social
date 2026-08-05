import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post("/registro", async (req, res) => {
  try {
    const senhaCriptografada = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: senhaCriptografada,
      },
    });

    res.status(201).json("Usuário cadastrado com sucesso");
  } catch (error) {
    if (error.code == "P2002") {
      return res
        .status(409)
        .json("Esse email já está associado a outro usuário :( tente outro");
    }
    return res.status(500).json("Erro, recarregue a página!");
  }
});

router.post("/login", async (req, res) => {
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).json("Dados incorretos");
    }

    const senhaCorreta = await bcrypt.compare(req.body.password, user.password);

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      return res.status(200).json({
        mensagem: "Login feito com sucesso!",
        token: token,
      });
    } else {
      return res.status(401).json("Dados incorretos");
    }
  } catch (error) {
    res.status(500).json("Erro, recarregue a página!");
  }
});

export default router;
