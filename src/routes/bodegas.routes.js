import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarBodega, insertarBodega, listarBodega, mantenerBodega } from "../controllers/bodegas.controller.js";

const router = Router();

router.get("/bodegas/:codigoSucursal/:filtro", authMiddleware, listarBodega);

router.post("/bodegas", authMiddleware, insertarBodega);

router.patch("/bodegas", authMiddleware, editarBodega);
router.patch("/bodegas/mantener", authMiddleware, mantenerBodega);
export default router;