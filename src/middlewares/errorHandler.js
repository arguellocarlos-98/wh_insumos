import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 400;

  logger.error({
    message: `[${err.name}] ${err.message}`,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(status).json({
    estado: false,
    found: false,
    error: err.name || 'Error',
    message: err.message || 'Ocurrió un error inesperado',
  });
}
