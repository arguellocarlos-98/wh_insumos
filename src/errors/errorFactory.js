import {
  AppError,
  ValidationError,
  NotFoundError,
  AuthError,
  DatabaseError,
} from './AppError.js';

export function errorFactory(type, message) {
  switch (type) {
    case 'validation':
      return new ValidationError(message);
    case 'notfound':
      return new NotFoundError(message);
    case 'auth':
      return new AuthError(message);
    case 'db':
      return new DatabaseError(message);
    default:
      return new AppError(message || 'Error desconocido', 500);
  }
}
