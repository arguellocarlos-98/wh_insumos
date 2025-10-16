// ABM de Estibas
// Listar Estibas
export const queryListarEstiba = "call `sp_listarEstiba`(?,?);";
// Insertar Estibas
export const queryInsertarEstiba = "call `sp_insertarEstiba`(?,?,?,?,?,?);";
// Editar Estibas
export const queryEditarEstiba = "call `sp_editarEstiba`(?,?,?,?,?,?,?);";
// Mantener Estibas
export const queryMantenerEstiba = "call `sp_mantenerEstiba`(?,?,?);";
// Insertar SKU por CDV
export const queryInsertarEstibaCSV = `
INSERT INTO estibas (
  codigoRotacion,
  codigoZona,
  nombreEstiba,
  capacidadMaxima,
  pri,
  usuarioInsercion
)
VALUES ?
ON DUPLICATE KEY UPDATE
  codigoRotacion = VALUES(codigoRotacion),
  codigoZona = VALUES(codigoZona),
  nombreEstiba = VALUES(nombreEstiba),
  capacidadMaxima = VALUES(capacidadMaxima),
  pri = VALUES(pri),
  usuarioEdicion = VALUES(usuarioInsercion),
  fechaEdicion = CURRENT_TIMESTAMP();
`;