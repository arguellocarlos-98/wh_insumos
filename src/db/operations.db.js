import pool from '../config/pool.config.js'
import { generarSQLLog } from '../utils/sql.helper.js'

export const listarSP = async (sql, params) => {
  try {
    const [rows] = await pool.query(sql, params)
    const esArray = Array.isArray(rows)
    return {
      estado: true,
      found: esArray && rows.length > 0,
      data: esArray ? rows : []
    }
  } catch (error) {
    return {
      estado: false,
      found: false,
      data: [],
      errorMessage: error.message,
      sql: generarSQLLog(sql, params)
    }
  }
}

export const insertarSPTransaccion = async (sql, params) => {
  try {
    const result = await pool.withTransaction(async (conn) => {
      const [rows] = await conn.query(sql, params)
      return rows
    })
    const esArrayDoble = Array.isArray(result) && Array.isArray(result[0])
    return {
      estado: true,
      found: esArrayDoble && result[0].length > 0,
      data: esArrayDoble ? result[0] : []
    }
  } catch (error) {
    return {
      estado: false,
      found: false,
      data: [],
      errorMessage: error.message,
      sql: generarSQLLog(sql, params)
    }
  }
}
