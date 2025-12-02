import { Router } from "express";
import { editarIndicador, insertarIndicador, listarIndicador, mantenerIndicador } from "../controllers/indicadores.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PETICIONES GET
router.get("/indicadores/:codigoSucursal/:filtro/:tipoIndicador", authMiddleware, listarIndicador);

// PETICIONES POST
router.post("/indicadores", authMiddleware, insertarIndicador);

// PETICIONES PATCH
router.patch("/indicadores/editar", authMiddleware, editarIndicador);
router.patch("/indicadores/mantener", authMiddleware, mantenerIndicador);

export default router;