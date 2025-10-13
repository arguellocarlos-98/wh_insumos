import { Router } from 'express';

import remitosRoutes from './remito.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import depositosRoutes from './depositos.routes.js';
const router = Router()

router.use(remitosRoutes);
router.use(usuariosRoutes);
router.use(depositosRoutes);

export default router
