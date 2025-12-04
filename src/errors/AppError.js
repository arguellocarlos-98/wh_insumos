export class AppError extends Error {
  constructor(message, statusCode, name = 'AppError') {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Datos inválidos') {
    super(message, 400, 'ValidationError');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404, 'NotFoundError');
  }
}

export class AuthError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401, 'AuthError');
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Error interno de base de datos') {
    super(message, 500, 'DatabaseError');
  }
}
