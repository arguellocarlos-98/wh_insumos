import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarRotacion, insertarRotacion, listarRotacion, mantenerRotacion } from "../controllers/rotaciones.controller.js";

const router = Router();

router.get("/rotaciones/:codigoSucursal/:filtro", authMiddleware, listarRotacion);

router.post("/rotaciones", authMiddleware, insertarRotacion);

router.patch("/rotaciones", authMiddleware, editarRotacion);
router.patch("/rotaciones/mantener", authMiddleware, mantenerRotacion);
export default router;