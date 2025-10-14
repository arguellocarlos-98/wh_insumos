import mysql from 'mysql2/promise'
import { dbConfig } from './database.config.js'

class Pool {
  constructor() {
    if (!Pool.instance) {
      this.pool = mysql.createPool(dbConfig)
      Pool.instance = this
    }
    return Pool.instance
  }

  async getConection() {
    const connection = await this.pool.getConnection()
    return connection
  }

  async query(sql, params = []) {
    if (!this.pool) throw new Error("Pool no inicializado o ya cerrado");
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  async close() {
    await this.pool.end()
    this.pool = null
  }

  async transaction(callback) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback().catch(() => {});
      throw error;
    } finally {
      connection.release();
    }
  }
}

const pool = new Pool()
export default pool;