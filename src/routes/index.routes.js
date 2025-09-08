import { Router } from 'express'

import remitosRoutes from './remito.routes.js'
import usuariosRoutes from './usuarios.routes.js'

const router = Router()

router.use(remitosRoutes)
router.use(usuariosRoutes)

export default router
