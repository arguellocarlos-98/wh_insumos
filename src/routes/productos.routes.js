import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarProducto, insertarProducto, listarProducto, mantenerProducto } from "../controllers/productos.controller.js";

const router = Router();

router.get("/productos/:filtro", authMiddleware, listarProducto);

router.post("/productos", authMiddleware, insertarProducto);

router.patch("/productos", authMiddleware, editarProducto);
router.patch("/productos/mantener", authMiddleware, mantenerProducto);

export default router;