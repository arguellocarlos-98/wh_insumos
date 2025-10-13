import { Router } from "express";
import { editarRol, insertarRol, listarRol, mantenerRol } from "../controllers/roles.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/roles/:codigoSucursal/:filtro", authMiddleware, listarRol);

router.post("/roles", insertarRol);

router.patch("/roles", editarRol);
router.patch("/roles/mantener", mantenerRol);
export default router;