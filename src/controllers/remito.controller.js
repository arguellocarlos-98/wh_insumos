import { model_sp_insertarRemito, model_sp_listarRemitoxFecha } from '../models/remito.model.js'

export const _sp_listarRemitoxFecha = async (req, res) => {
  const parametros = req.params
  try {
    const result = await model_sp_listarRemitoxFecha(parametros)
    if (result.estado) {
      res.json({
        estado: result.estado,
        found: result.found,
        data: result.data
      })
    } else {
      res.json({
        estado: result.estado,
        found: result.found,
        data: result.data,
        errorMessage: result.errorMessage,
        sql: result.sql
      })
    }
  } catch (error) {
    // console.error('Error en _sp_listarRemitoxFecha:', error);
    res.json({
      estado: false,
      found: false,
      data: [],
      errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
      sql: null
    })
  }
}

export const sp_insertarRemito = async (req, res) => {
  const parametros = req.body
  try {
    const result = await model_sp_insertarRemito(parametros)
    if (result.estado) {
      res.json({
        estado: result.estado,
        codigoRemito: result.codigoRemito
      })
    } else {
      res.json({
        estado: result.estado,
        codigoRemito: result.codigoRemito,
        errorMessage: result.errorMessage,
        sql: result.sql
      })
    }
  } catch (error) {
    res.json({
      estado: false,
      codigoRemito: null,
      errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
      sql: null
    })
  }
}
