import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarEstiba, insertarEstiba, listarEstiba, mantenerEstiba } from "../controllers/estibas.controller.js";

const router = Router();

router.get("/estibas/:codigoSucursal/:filtro", authMiddleware, listarEstiba);

router.post("/estibas", insertarEstiba);

router.patch("/estibas", editarEstiba);
router.patch("/estibas/mantener", mantenerEstiba);
export default router;