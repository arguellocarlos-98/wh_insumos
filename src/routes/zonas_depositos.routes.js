import { Router } from "express";
import { editarZonaDeposito, insertarZonaDeposito, listarZonaDeposito, mantenerZonaDeposito } from "../controllers/zonas_depositos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/zonasdepositos/:codigoSucursal/:filtro", authMiddleware, listarZonaDeposito);

router.post("/zonasdepositos", authMiddleware, insertarZonaDeposito);

router.patch("/zonasdepositos", authMiddleware, editarZonaDeposito);
router.patch("/zonasdepositos/mantener", authMiddleware, mantenerZonaDeposito);
export default router;