import mysql from 'mysql2/promise'
import { dbConfig } from './database.config.js'

class Pool {
  constructor () {
    if (!Pool.instance) {
      this.pool = mysql.createPool(dbConfig)
      Pool.instance = this
    };
    return Pool.instance
  };

  async getConection () {
    const connection = await this.pool.getConnection()
    return connection
  }

  async query (sql, params = []) {
    const result = await this.pool.query(sql, params)
    if (!Array.isArray(result) || result.length < 1 || !Array.isArray(result[0])) {
      throw new Error('Respuesta inesperada del motor MySQL');
    };
    const [rows] = result
    return rows
  };

  async close () {
    await this.pool.end()
  };

  async transaction (callback) {
    let connection
    try {
      connection = await this.pool.getConnection()
      await connection.beginTransaction()
      const result = await callback(connection)
      await connection.commit()
      return result
    } catch (error) {
      if (connection) {
        await connection.rollback().catch(() => { })
        connection.release()
      };
      throw error
    } finally {
      if (connection) {
        connection.release()
      };
    }
  };
};

const pool = new Pool()
export default pool
