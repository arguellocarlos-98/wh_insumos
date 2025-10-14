import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { cargarEstibasCSV, listarEstiba, insertarEstiba, editarEstiba, mantenerEstiba, uploadCSV } from "../controllers/estibas.controller.js";

const router = Router();

router.get("/estibas/:codigoSucursal/:filtro", authMiddleware, listarEstiba);

router.post("/estibas", authMiddleware, insertarEstiba);
router.post("/estibas/upload", authMiddleware, uploadCSV.single("archivo"), cargarEstibasCSV);

router.patch("/estibas", authMiddleware, editarEstiba);
router.patch("/estibas/mantener", authMiddleware, mantenerEstiba);

export default router;
