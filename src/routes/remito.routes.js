import { Router } from 'express'
import { buscarRemitoPreparado, buscarRemitoRecibido, entregarRemito, insertarRemito, mostrarRemitoDetallexCod, recibirRemito } from '../controllers/remito.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

// PETICIONES GET
router.get("/remito/preparacion_carga/:codigoSucursal/:fechaInicio/:fechaFin", buscarRemitoPreparado);
router.get("/remito/recibidos/:codigoSucursal/:fechaInicio/:fechaFin", buscarRemitoRecibido);
router.get("/remito/preparacion_carga/:codigoRemito", mostrarRemitoDetallexCod);

// PETICIONES POST
router.post("/remito", authMiddleware, insertarRemito);

// PETICIONES PATCH
router.patch("/remito/entregar", entregarRemito);
router.patch("/remito/recibir", recibirRemito);

export default router;