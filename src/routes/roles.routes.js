import { Router } from "express";
import { listarRol } from "../controllers/roles.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/roles/:codigoSucursal/:filtro", authMiddleware,listarRol);
export default router;