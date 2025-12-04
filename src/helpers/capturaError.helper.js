import { AppError, DatabaseError } from '../errors/AppError.js';
import Sentry from '../../instruments.js';

export const capturaError = async (error, context = {}) => {
  // Si el error no es un AppError, lo convertimos en DatabaseError
  const enrichedError = error instanceof AppError
    ? error
    : new DatabaseError('Error interno de base de datos', { ...context, originalMessage: error.message });

  // En Sentry mandamos TODO: mensaje interno + contexto
  Sentry.captureException(enrichedError, {
    extra: { ...enrichedError.context, ...context }
  });
  await Sentry.flush(2000);

  // Lanzamos el mensaje seguro para el frontend
  throw enrichedError;
};
