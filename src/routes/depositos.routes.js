import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarDeposito, insertarDeposito, listarDeposito, mantenerDeposito } from "../controllers/depositos.controller.js";

const router = Router();

router.post("/depositos", authMiddleware, insertarDeposito);

router.patch("/depositos", authMiddleware, editarDeposito);
router.patch("/depositos/mantener", authMiddleware, mantenerDeposito);

router.get("/depositos/:codigoSucursal/:filtro", authMiddleware, listarDeposito);
export default router;