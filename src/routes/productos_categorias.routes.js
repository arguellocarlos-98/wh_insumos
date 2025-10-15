import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarCategoria, insertarCategoria, listarCategoria, mantenerCategoria } from "../controllers/productos_categorias.controller.js";

const router = Router();

router.get("/productos_categorias/:codigoSucursal/:filtro", authMiddleware, listarCategoria);
router.post("/productos_categorias", authMiddleware, insertarCategoria);
router.patch("/productos_categorias", authMiddleware, editarCategoria);
router.patch("/productos_categorias/mantener", authMiddleware, mantenerCategoria);

export default router;