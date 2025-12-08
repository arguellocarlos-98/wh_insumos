import { Router } from 'express'
import { buscarRemitoPreparado, buscarRemitoRecibido, cancelarRemito, editarRemitoDetalle, entregarRemito, insertarRemito, insertarRemitoCheck, insertarRemitoPanel, mostrarRemitoDetallexCod, recibirRemito } from '../controllers/remito.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

// PETICIONES GET
router.get("/remito/preparacion_carga/:codigoSucursal/:fechaInicio/:fechaFin/:filtro", buscarRemitoPreparado);
router.get("/remito/recibidos/:codigoSucursal/:fechaInicio/:fechaFin/:filtro", buscarRemitoRecibido);
router.get("/remito/preparacion_carga/:codigoRemito", mostrarRemitoDetallexCod);

// PETICIONES POST
router.post("/remito", authMiddleware, insertarRemito);
router.post("/remito/panel", authMiddleware, insertarRemitoPanel);
router.post("/remito/check", authMiddleware, insertarRemitoCheck);

// PETICIONES PATCH
router.patch("/remito/entregar", entregarRemito);
router.patch("/remito/recibir", recibirRemito);
router.patch("/remito/cancelar", cancelarRemito);
router.patch("/remito/editar/detalle", editarRemitoDetalle);

export default router;