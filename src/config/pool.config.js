import mysql from 'mysql2/promise';
import { dbConfig } from './database.config.js';

class Pool {
  constructor() {
    if (!Pool.instance) {
      this.pool = mysql.createPool(dbConfig);
      Pool.instance = this;
    }
    return Pool.instance;
  }

  // Query simple: toma y libera la conexión automáticamente
  async query(sql, params = []) {
    // mysql2/promise pool maneja conexiones automáticamente
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async close() {
    await this.pool.end();
    this.pool = null;
  }
}

const pool = new Pool();
export default pool;
