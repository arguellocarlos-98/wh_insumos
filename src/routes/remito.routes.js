import { Router } from 'express'
import { _sp_listarRemitoxFecha, sp_insertarRemito } from '../controllers/remito.controller.js'

const router = Router()

router.get('/remitos/listar/:codigoSucursal/:fechaInicio/:fechaFin', _sp_listarRemitoxFecha)

router.post('/remitos', sp_insertarRemito)

export default router
