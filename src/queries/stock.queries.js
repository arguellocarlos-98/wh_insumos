// ABM de Stock

// Insertar Stock
export const queryInsertarStock = "call `sp_insertarStock` (?,?,?,?,?,?,?,?,?);";
// Listar Stock
export const queryListarStock = "call `sp_listarStock`(?,?);";
// Editar Stock
export const queryEditarStock = "call `sp_editarStock` (?,?,?,?,?,?,?,?,?,?);";
// Mantener Stock
export const queryMantenerStock = "call `sp_mantenerStock` (?,?,?);";
// Insertar Stock de Manera Masiva
export const queryUpsertStockCSV = `
INSERT INTO stock (
  codigoEstiba,
  codigoProducto,
  codigoBarra,
  lotePlanta,
  loteProducto,
  fechaFabricacion,
  fechaVencimiento,
  cantidadStock,
  usuarioInsercion
)
VALUES ?;
`;