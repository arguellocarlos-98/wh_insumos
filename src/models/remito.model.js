import { query_sp_insertarRemito, query_sp_listarRemitoxFecha } from '../queries/remitos.queries.js'
import moment from 'moment'
import { generarSQLLog } from '../utils/sql.helper.js'
import { insertarProcedure, listarProcedure } from '../db/operations.db.js'

export const model_sp_listarRemitoxFecha = async (parametros) => {
  const sqlParametros = [
    parametros.codigoSucursal,
    parametros.fechaInicio,
    parametros.fechaFin
  ]

  try {
    const resultado = await listarProcedure(query_sp_listarRemitoxFecha, sqlParametros)
    if (resultado.estado && resultado.found) {
      resultado.data = resultado.data.map(consulta => ({
        codigoRemito: consulta.codigoRemito,
        fechaRecepcion: moment(consulta.fechaRecepcion).format('YYYY-MM-DD'),
        remitoEntrada: consulta.remitoEntrada,
        proveedorRemito: consulta.proveedorRemito,
        skuRemito: consulta.skuRemito,
        materialRemito: consulta.materialRemito,
        cantidadRemito: consulta.cantidadRemito,
        loteYpane: consulta.loteYpane,
        loteProveedor: consulta.loteProveedor,
        fechaFabricacion: moment(consulta.fechaFabricacion).format('YYYY-MM-DD'),
        fechaVencimiento: moment(consulta.fechaVencimiento).format('YYYY-MM-DD'),
        estadoRemito: consulta.estadoRemito
      }))
    };
    return resultado
  } catch (error) {
    return {
      estado: false,
      found,
      data,
      errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
      sql: generarSQLLog(query_sp_listarRemitoxFecha, sqlParametros)
    }
  }
}

export const model_sp_insertarRemito = async (parametros) => {
  const sqlParametros = [
    parametros.fechaRecepcion,
    parametros.remitoEntrada,
    parametros.proveedorRemito,
    parametros.skuRemito,
    parametros.materialRemito,
    parametros.cantidadRemito,
    parametros.loteYpane,
    parametros.loteProveedor,
    parametros.fechaFabricacion,
    parametros.fechaVencimiento,
    parametros.codigoUsuario
  ]

  try {
    const resultado = await insertarProcedure(query_sp_insertarRemito, sqlParametros)
    const codigoRemito = resultado.found ? resultado.data[0]?.codigoRemito ?? 0 : 0
    return {
      estado: resultado.estado,
      codigoRemito,
      ...(resultado.estado
        ? {}
        : {
          errorMessage: `Error en ${import.meta.url} ${resultado.errorMessage}`,
          sql: resultado.sql
        })
    }
  } catch (error) {
    return {
      estado: false,
      codigoRemito: 0,
      errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
      sql: generarSQLLog(query_sp_insertarRemito, sqlParametros)
    }
  }
}
