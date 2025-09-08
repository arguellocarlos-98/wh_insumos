import { Router } from 'express'
import { insertarUsuario, loginUsuario, logoutUsuario, refreshToken } from '../controllers/usuarios.controller.js'
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()
router.post('/usuarios', authMiddleware, insertarUsuario);
router.post('/usuarios/login', loginUsuario);

router.post("/usuarios/logout", authMiddleware, logoutUsuario);
router.post("/usuarios/refresh", authMiddleware, refreshToken);
export default router;