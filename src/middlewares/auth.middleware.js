import jwt from "jsonwebtoken";
import { keys } from "../../env.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ 
      estado: false,
      error: "No autorizado. Token faltante." 
    });
  }
  try {
    const decoded = jwt.verify(token, keys.SECRET_JWT_KEY);
    req.usuario = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ 
      estado: false,
      error: "Token inválido o expirado." 
    });
  }
};
