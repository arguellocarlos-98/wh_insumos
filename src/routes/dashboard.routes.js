import { Router } from "express";
import { dashboardProductos, dashboardRemito, dashboardUltimosRemitos, dashboardVencimientoProximo } from "../controllers/dashboard.controller.js";

const router = Router();

// PETICIONES GET
router.get("/dashboard/listado/remito/:codigoDeposito", dashboardUltimosRemitos);
router.get("/dashboard/productos/vencimientos/:codigoDeposito", dashboardVencimientoProximo);
router.get("/dashboard/productos/:codigoDeposito", dashboardProductos);
router.get("/dashboard/remito/:codigoDeposito", dashboardRemito);

export default router;