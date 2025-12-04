// index.js
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.routes.js';
import { environment } from '../env.js';
import cookieParser from 'cookie-parser';
import Sentry from '../instruments.js';

const app = express();

// -----------------------------
// CORS, JSON, cookies, uploads
// -----------------------------
const allowedOrigins = [
  "http://localhost:8888",
  "https://insumos.cervepar-planta.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('./src/uploads'));

// -----------------------------
// RUTAS
// -----------------------------
const api = '/api';
app.use(api, apiRoutes);

// -----------------------------
// MIDDLEWARE DE ERRORES PERSONALIZADO
// -----------------------------
app.use((err, req, res, next) => {
  const eventId = Sentry.captureException(err);

  res.status(err.statusCode || 500).json({
    estado: false,
    found: false,
    data: null,
    error: err.name,
    message: err.message,
    sentryId: eventId,
  });
});

// -----------------------------
// SERVIDOR
// -----------------------------
const port = environment.prod ? environment.api_port_prod : environment.api_port_dev;

app.listen(port, () => {
  console.info('Running Warehouse Productions Inputs Api Service');
  console.info(`Port: ${port}`);
  console.info(environment.prod ? 'Production Mode' : 'Development Mode');
}).on('error', (err) => {
  console.error('Error starting the server:', err.message);
});
