import pool from '../config/pool.config.js';
import path from "path";
import fs from "fs";
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


/**
 * Carga datos de un archivo CSV en una tabla usando LOAD DATA LOCAL INFILE.
 *
 * @param {string} rutaCSV - Ruta al archivo CSV (relativa o absoluta)
 * @param {string} tablaDestino - Nombre de la tabla donde se insertarán los datos
 * @param {object} opciones - Configuración del delimitador y formato
 * @example
 * await cargarArchivoCSV('uploads/estibas.csv', 'estibas', {
 *   camposTerminados: ',',
 *   lineasTerminadas: '\n',
 *   ignorarLineas: 1
 * });
 */
export const cargarArchivoCSV = async (
  rutaCSV,
  tablaDestino,
  opciones = {}
) => {
  const {
    camposTerminados = ";",
    lineasTerminadas = "\n",
    ignorarLineas = 1,
  } = opciones;

  try {
    const sql = `
      LOAD DATA LOCAL INFILE ?
      INTO TABLE ${tablaDestino}
      FIELDS TERMINATED BY ?
      LINES TERMINATED BY ?
      IGNORE ? LINES;
    `;

    const result = await pool.query({
      sql,
      infileStreamFactory: () => fs.createReadStream(rutaCSV)
    }, [rutaCSV, camposTerminados, lineasTerminadas, ignorarLineas]);

    return {
      estado: true,
      found: result.affectedRows > 0,
      data: {
        insertedRows: result.affectedRows,
      },
    };
  } catch (error) {
    throw new DatabaseError(
      `Error en LOAD DATA: ${error.message} | SQL: ${generarSQLLog(
        "LOAD DATA LOCAL INFILE",
        [rutaCSV, tablaDestino]
      )}`
    );
  }
};