import { Router } from "express";
import { editarRol, insertarRol, listarRol, mantenerRol } from "../controllers/roles.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/roles/:codigoSucursal/:filtro", authMiddleware, listarRol);

router.post("/roles", authMiddleware, insertarRol);

router.patch("/roles", authMiddleware, editarRol);
router.patch("/roles/mantener", authMiddleware, mantenerRol);
export default router;