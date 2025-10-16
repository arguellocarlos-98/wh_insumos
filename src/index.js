import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.routes.js';
import { environment } from '../env.js';
import cookieParser from 'cookie-parser';
import Sentry from '../instruments.js';

const app = express()

const port = (environment.prod) ? environment.api_port_prod : environment.api_port_dev
const api = '/api'

app.use(cors({
  origin: 'http://localhost:8888',
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('./src/uploads'))

app.use(api, apiRoutes);

app.use((err, req, res, next) => {
  const eventId = Sentry.captureException(err);
  
  res.status(err.statusCode || 400).json({
    estado: false,
    found: false,
    data: null,
    error: err.name,
    message: err.message,
    sentryId: eventId,
  });
});

app.listen(port, () => {
  console.info('Running Warehouse Productions Inputs Api Service')
  console.info(`Port: ${port}`)
  console.info(`${environment.prod ? 'Production Mode' : 'Development Mode'}`)
}).on('error', (err) => {
  console.error('Error starting the server:', err.message)
})
