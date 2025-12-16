import { Router } from 'express'
import { buscarRemitoPreparado, buscarRemitoRecibido, cancelarRemito, editarRemitoDetalle, entregarRemito, insertarRemito, insertarRemitoCheck, insertarRemitoDetalle, insertarRemitoPanel, listarRemitoSectoral, mostrarRemitoDetallexCod, recibirRemito } from '../controllers/remito.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

// PETICIONES GET
router.get("/remito/sectorial/:codigoSucursal/:fechaInicio/:fechaFin/:filtro", authMiddleware, listarRemitoSectoral);
router.get("/remito/preparacion_carga/:codigoSucursal/:fechaInicio/:fechaFin/:filtro", authMiddleware, buscarRemitoPreparado);
router.get("/remito/recibidos/:codigoSucursal/:fechaInicio/:fechaFin/:filtro", authMiddleware, buscarRemitoRecibido);
router.get("/remito/preparacion_carga/:codigoRemito/:filtro", authMiddleware, mostrarRemitoDetallexCod);

// PETICIONES POST
router.post("/remito", authMiddleware, insertarRemito);
router.post("/remito/panel", authMiddleware, insertarRemitoPanel);
router.post("/remito/check", authMiddleware, insertarRemitoCheck);
router.post("/remito/detalle", authMiddleware, insertarRemitoDetalle);

// PETICIONES PATCH
router.patch("/remito/entregar", authMiddleware, entregarRemito);
router.patch("/remito/recibir", authMiddleware, recibirRemito);
router.patch("/remito/cancelar", authMiddleware, cancelarRemito);
router.patch("/remito/editar/detalle", authMiddleware, editarRemitoDetalle);

export default router;