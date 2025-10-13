import { Router } from 'express';

import remitosRoutes from '../routes/remito.routes.js';
import usuariosRoutes from '../routes/usuarios.routes.js';
import depositosRoutes from '../routes/depositos.routes.js';
import rolesRoutes from '../routes/roles.routes.js';
import bodegasRoutes from '../routes/bodegas.routes.js';
import zonasRoutes from '../routes/zonas_depositos.routes.js';
import rotacionesRoutes from '../routes/rotaciones.routes.js';
const router = Router()

router.use(remitosRoutes);
router.use(usuariosRoutes);
router.use(depositosRoutes);
router.use(rolesRoutes);
router.use(bodegasRoutes);
router.use(zonasRoutes);
router.use(rotacionesRoutes);

export default router
