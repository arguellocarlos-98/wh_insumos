import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarEstiba, insertarEstiba, listarEstiba, mantenerEstiba } from "../controllers/estibas.controller.js";

const router = Router();

router.get("/estibas/:codigoSucursal/:filtro", authMiddleware, listarEstiba);

router.post("/estibas", authMiddleware,insertarEstiba);

router.patch("/estibas", authMiddleware,editarEstiba);
router.patch("/estibas/mantener", authMiddleware,mantenerEstiba);
export default router;