import pool from '../config/pool.config.js';
import { generarSQLLog } from '../utils/sql.helper.js';
import { DatabaseError } from '../errors/AppError.js';

export const listarProcedure = async (sql, params = []) => {
  try {
    const rows = await pool.query(sql, params);
    const data = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
    const esArray = Array.isArray(data);
    return {
      estado: true,
      found: esArray && data.length > 0,
      data: esArray ? data : []
    };
  } catch (error) {
    throw new DatabaseError(
      `Error en SELECT: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
    );
  }
};

export const mostrarProcedure = async (sql, params) => {
  const result = await listarProcedure(sql, params);
  if (!result.estado) {
    throw new DatabaseError(`Error al ejecutar SP: ${result.errorMessage}`);
  }
  return {
    estado: true,
    found: !!result.data[0],
    data: result.data[0] || null
  };
};

export const insertarProcedure = async (sql, params, connection = null) => {
  try {
    const conn = connection || pool;
    const result = await conn.query(sql, params);
    const esArrayDoble = Array.isArray(result) && Array.isArray(result[0]);
    return {
      estado: true,
      found: esArrayDoble ? result[0].length > 0 : result.length > 0,
      data: esArrayDoble ? result[0] : result
    };
  } catch (error) {
    throw new DatabaseError(
      `Error en INSERT: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
    );
  }
};

export const actualizarProcedure = async (sql, params = [], connection = null) => {
  try {
    const result = await pool.query(sql, params);
    return {
      estado: true,
      found: result.affectedRows > 0,
      data: {
        affectedRows: result.affectedRows,
        changedRows: result.changedRows
      }
    };
  } catch (error) {
    throw new DatabaseError(
      `Error en UPDATE: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
    );
  }
};


/**
 * Realiza un UPSERT masivo desde un CSV usando una transacción.
 * Solo para tablas con estructura compatible con ON DUPLICATE KEY UPDATE.
 *
 * @param {string} rutaCSV - Ruta absoluta del CSV
 * @param {string[]} columnas - Orden de columnas que se usarán en el VALUES
 * @param {string} queryUpsert - Query de UPSERT con VALUES ?
 * @returns {Promise<{estado: boolean, inserted: number, updated: number}>}
 */
import { leerCSV } from "../utils/csv.helper.js";

export const upsertCSV = async (rutaCSV, columnas, queryUpsert, preQuery = null) => {
  const connection = await pool.pool.getConnection();
  try {
    const registros = await leerCSV(rutaCSV);
    if (!registros.length) throw new DatabaseError("CSV vacío o mal formateado");

    // Tomar el primer usuario del CSV (todos deben pertenecer a la misma sucursal)
    const codigoUsuario = registros[0]?.codigoUsuario;
    if (!codigoUsuario) throw new DatabaseError("No se encontró codigoUsuario en el CSV");

    // Mapear cada registro a un array según las columnas
    const values = registros.map((r) => columnas.map((col) => r[col]));

    await connection.beginTransaction();

    if (preQuery) {
      await connection.query(preQuery, [codigoUsuario, codigoUsuario]);
    }

    const [result] = await connection.query(queryUpsert, [values]);

    await connection.commit();

    return {
      estado: true,
      inserted: result.affectedRows,
      updated: result.changedRows || 0,
    };
  } catch (error) {
    await connection.rollback();
    throw new DatabaseError(`Error en UPSERT CSV: ${error.message}`);
  } finally {
    connection.release();
  }
};