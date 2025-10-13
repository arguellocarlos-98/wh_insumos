import { Router } from 'express';

import remitosRoutes from './remito.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import depositosRoutes from './depositos.routes.js';
import rolesRoutes from './roles.routes.js';

const router = Router()

router.use(remitosRoutes);
router.use(usuariosRoutes);
router.use(depositosRoutes);
router.use(rolesRoutes);

export default router
