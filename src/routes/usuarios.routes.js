import { Router } from 'express'
import { editarUsuario, insertarUsuario, loginUsuario, logoutUsuario, refreshToken } from '../controllers/usuarios.controller.js'
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()
router.post('/usuarios', insertarUsuario);
router.post('/usuarios/login', loginUsuario);

router.post("/usuarios/logout", authMiddleware, logoutUsuario);
router.post("/usuarios/refresh", refreshToken);

router.patch("/usuarios", editarUsuario);
export default router;