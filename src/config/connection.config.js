import mysql from 'mysql2/promise'
import { dbConfig } from './database.config.js'
import { environment } from '../../env.js'

class Connection {
  async query (sql, params) {
    try {
      const cx = await mysql.createConnection(dbConfig)
      const consulta = await cx.execute(sql, params)
      await cx.end()
      return consulta
    } catch (error) {
      if (environment.prod === false) {
        console.error('Database query error:', error)
      };
      throw error
    }
  };
};

export default Connection
