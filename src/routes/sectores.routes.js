import { Router } from "express";
import { listarSector } from "../controllers/sectores.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PETICIONES GET
router.get("/sectores/:codigoSucursal/:filtro", authMiddleware, listarSector);

export default router;