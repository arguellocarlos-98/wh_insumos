import { environment } from '../../env.js'

export const dbConfig = {
  host: environment.db_host,
  user: environment.db_user,
  password: environment.db_user_password,
  database: (environment.prod) ? environment.db_prod : environment.db_dev,
  port: environment.db_port,
  connectTimeout: 10000,
  waitForConnections: true,
  flags: ["+LOCAL_FILES"]
}
