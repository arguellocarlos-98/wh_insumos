import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarStock, insertarStock, listarStock, mantenerStock } from "../controllers/stock.controller.js";

const router = Router();

router.get("/stock/:codigoSucursal/:filtro", authMiddleware, listarStock);
router.post("/stock", authMiddleware, insertarStock);
router.patch("/stock", authMiddleware, editarStock);
router.patch("/stock/mantener", authMiddleware, mantenerStock);

export default router;