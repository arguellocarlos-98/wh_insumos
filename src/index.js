import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import apiRoutes from './routes/index.routes.js';
import { environment } from '../env.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import logsRoutes from './routes/logs.routes.js';

const app = express()

const port = (environment.prod) ? environment.api_port_prod : environment.api_port_dev
const api = '/api'

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use('/uploads', express.static('./src/uploads'))

app.use(api, apiRoutes);
app.use('/logs', logsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.info('Running Warehouse Productions Inputs Api Service')
  console.info(`Port: ${port}`)
  console.info(`${environment.prod ? 'Production Mode' : 'Development Mode'}`)
}).on('error', (err) => {
  console.error('Error starting the server:', err.message)
})
