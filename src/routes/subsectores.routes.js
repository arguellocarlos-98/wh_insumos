import { Router } from "express";
import { editarSubsector, insertarSubsector, listarSubsector, mantenerSubsector } from "../controllers/subsectores.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PETICIONES GET
router.get("/subsectores/:codigoSucursal/:filtro", authMiddleware, listarSubsector);

// PETICIONES POST
router.post("/subsectores", authMiddleware, insertarSubsector);

// PETICIONES PATCH
router.patch("/subsectores/editar", authMiddleware, editarSubsector);
router.patch("/subsectores/mantener", authMiddleware, mantenerSubsector);

export default router;