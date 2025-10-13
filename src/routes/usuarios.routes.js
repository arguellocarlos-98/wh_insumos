import { Router } from 'express'
import { editarUsuario, insertarUsuario, listarUsuario, loginUsuario, logoutUsuario, mantenerUsuario, refreshToken } from '../controllers/usuarios.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()
router.post('/usuarios', insertarUsuario);
router.post('/usuarios/login', loginUsuario);
router.post("/usuarios/logout", authMiddleware, logoutUsuario);
router.post("/usuarios/refresh", refreshToken);

router.patch("/usuarios", authMiddleware, editarUsuario);
router.patch("/usuarios/mantener", authMiddleware, mantenerUsuario);

router.get("/usuarios/:codigoSucursal/:filtro", authMiddleware, listarUsuario);
export default router;