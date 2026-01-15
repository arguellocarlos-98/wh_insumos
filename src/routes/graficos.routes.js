import { Router } from "express";
import { cantidadStockDeposito } from "../controllers/graficos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

// PETICIONES GET
router.get("/graficos/deposito/total/:codigoSucursal", authMiddleware, cantidadStockDeposito);

export default router;