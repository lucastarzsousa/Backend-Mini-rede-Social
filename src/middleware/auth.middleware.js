import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("Token não enviado");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json("Token inválido");
  }
}

export default authMiddleware;
