import { Router } from 'express';

import remitosRoutes from './remito.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import depositosRoutes from './depositos.routes.js';
import rolesRoutes from './roles.routes.js';
import bodegasRoutes from './bodegas.routes.js';
import zonasRoutes from './zonas_depositos.routes.js';
import rotacionesRoutes from './rotaciones.routes.js';
import estibasRoutes from './estibas.routes.js';
import categoriasRoutes from './productos_categorias.routes.js';
import productosRoutes from './productos.routes.js';

const router = Router()

router.use(remitosRoutes);
router.use(usuariosRoutes);
router.use(depositosRoutes);
router.use(rolesRoutes);
router.use(bodegasRoutes);
router.use(zonasRoutes);
router.use(rotacionesRoutes);
router.use(estibasRoutes);
router.use(categoriasRoutes);
router.use(productosRoutes);

export default router
