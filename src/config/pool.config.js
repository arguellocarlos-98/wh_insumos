import mysql from "mysql2/promise";
import { dbConfig } from "./database.config.js";
import { generarSQLLog } from "../utils/sql.helper.js";
import { DatabaseError } from "../errors/AppError.js";

class Pool {
  constructor() {
    if (!Pool.instance) {
      this.pool = mysql.createPool(dbConfig);
      Pool.instance = this;
    }
    return Pool.instance;
  }

  // Query simple
  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.query(sql, params);
      return rows;
    } catch (error) {
      throw new DatabaseError(
        `Query fallida: ${error.message} | SQL: ${generarSQLLog(sql, params)}`
      );
    }
  }

  // Ejecutar callback dentro de una transacción
  async transaction(callback) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      // Pasamos la conexión al callback
      const result = await callback(connection);

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();

      // Si el error no es un DatabaseError, lo envolvemos
      if (!(error instanceof DatabaseError)) {
        throw new DatabaseError(
          `Transacción fallida: ${error.message} | SQL: ${generarSQLLog("TRANSACTION", [])}`
        );
      }
      throw error;
    } finally {
      connection.release();
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      Pool.instance = null; // ← Agregar esto
    }
  }
}

const pool = new Pool();
export default pool;
