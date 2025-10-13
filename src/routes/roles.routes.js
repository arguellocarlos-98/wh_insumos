import { Router } from "express";
import { listarRol } from "../controllers/roles.controller.js";

const router = Router();

router.get("/roles/:codigoSucursal/:filtro", listarRol);
export default router;