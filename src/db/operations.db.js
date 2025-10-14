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
      `Error en query: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
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

export const insertarProcedure = async (sql, params) => {
  try {
    const result = await pool.query(sql, params);
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

export const actualizarProcedure = async (sql, params = []) => {
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
