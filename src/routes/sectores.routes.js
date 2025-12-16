import { Router } from "express";
import { editarSector, insertarSector, listarSector, mantenerSector } from "../controllers/sectores.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PETICIONES GET
router.get("/sectores/:codigoSucursal/:filtro", authMiddleware, listarSector);

// PETICIONES POST
router.post("/sectores", authMiddleware, insertarSector);

// PETICIONES PATCH
router.patch("/sectores/editar", authMiddleware, editarSector);
router.patch("/sectores/mantener", authMiddleware, mantenerSector);

export default router;