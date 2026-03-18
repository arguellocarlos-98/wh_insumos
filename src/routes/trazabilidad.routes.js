import { Router } from "express";
import * as trazabilidadControllers from "../controllers/trazabilidad.controller.js";

const router = Router();

// PETICIONES GET
router.get("/trazabilidad/resumen/:codigoProducto", trazabilidadControllers.reporteTrazabilidadResumen);
router.get("/trazabilidad/entrada/:codigoProducto", trazabilidadControllers.reporteTrazabilidadEntrada);
router.get("/trazabilidad/salida/:codigoProducto", trazabilidadControllers.reporteTrazabilidadSalida);
router.get("/trazabilidad/sectorial/:codigoProducto", trazabilidadControllers.reporteTrazabilidadSectorial);
router.get("/trazabilidad/cronologico/:codigoProducto", trazabilidadControllers.reporteTrazabilidadCronologico);
export default router;