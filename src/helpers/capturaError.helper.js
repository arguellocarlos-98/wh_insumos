import { AppError, DatabaseError } from '../errors/AppError.js';
import Sentry from '../../instruments.js';

export const capturaError = async (error, context = {}) => {
  const enrichedError = error instanceof AppError ? error : new DatabaseError('Error interno de base de datos', { ...context, originalMessage: error.message });
  Sentry.captureException(enrichedError, {
    extra: { ...enrichedError.context, ...context }
  });
  await Sentry.flush(2000);
  throw enrichedError;
};
