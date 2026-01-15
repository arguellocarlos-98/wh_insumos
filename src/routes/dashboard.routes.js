import { Router } from "express";
import { dashboardProductos, dashboardRemito, dashboardUltimosRemitos, dashboardVencimientoProximo } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// PETICIONES GET
router.get("/dashboard/listado/remito/:codigoDeposito", authMiddleware, dashboardUltimosRemitos);
router.get("/dashboard/productos/vencimientos/:codigoDeposito", authMiddleware, dashboardVencimientoProximo);
router.get("/dashboard/productos/:codigoDeposito", authMiddleware, dashboardProductos);
router.get("/dashboard/remito/:codigoDeposito", authMiddleware, dashboardRemito);

export default router;