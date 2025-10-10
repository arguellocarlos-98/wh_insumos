import pool from '../config/pool.config.js';
import { generarSQLLog } from '../utils/sql.helper.js';
import { DatabaseError } from '../errors/AppError.js';

/**
 * Ejecuta cualquier query y devuelve array de resultados
 * Lanza DatabaseError si falla la query
 */
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
      `Error en query: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
    );
  }
};

/**
 * Ejecuta SP que devuelve un solo registro
 * Lanza DatabaseError si falla la SP
 */
export const mostrarProcedure = async (sql, params) => {
  const result = await listarProcedure(sql, params);

  if (!result.estado) {
    throw new DatabaseError(`Error al ejecutar SP: ${result.errorMessage}`);
  }

  const row = result.found ? result.data[0] : null;
  return {
    estado: true,
    found: !!row,
    data: row
  };
};

/**
 * Ejecuta INSERT / SP de inserción
 * Lanza DatabaseError si falla
 */
export const insertarProcedure = async (sql, params) => {
  try {
    const result = await pool.transaction(async (conn) => {
      const [rows] = await conn.query(sql, params);
      return rows;
    });

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

/**
 * Ejecuta UPDATE / SP de actualización
 * Lanza DatabaseError si falla
 */
export const actualizarProcedure = async (sql, params = []) => {
  try {
    const result = await pool.transaction(async (conn) => {
      const [res] = await conn.query(sql, params);
      return res;
    });

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
