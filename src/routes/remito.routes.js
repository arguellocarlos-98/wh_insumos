import { Router } from 'express'
import { insertarRemito } from '../controllers/remito.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

// PETICIONES GET

// PETICIONES POST
router.post("/remito", authMiddleware, insertarRemito);

// PETICIONES PATCH

export default router;