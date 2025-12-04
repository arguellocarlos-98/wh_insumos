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

export const queryDeshabilitarStockPorSucursal = `
UPDATE 
  stock
SET 
  estadoStock = 0,
  fechaEliminacion = NOW(),
  usuarioEliminacion = ?
WHERE usuarioInsercion IN (
  SELECT u.codigoUsuario
  FROM usuarios u
  WHERE u.codigoSucursal = (
    SELECT codigoSucursal FROM usuarios WHERE codigoUsuario = ?
  )
);
`;
// Buscar Stock por Codigo, Descripcion o Lote
export const queryBuscarStockDescripcionLote = "CALL `sp_buscarStockxDescripcionLote`(?,?,?);";