// ABM de Maestro de Productos
// Listar Maestro de Productos
export const queryListarProducto = "call `sp_listarProducto`(?);";

// Insertar Maestro de Productos
export const queryInsertarProducto = "call `sp_insertarProducto`(?,?,?,?,?);";

// Editar Maestro de Productos
export const queryEditarProducto = "call `sp_editarProducto`(?,?,?,?,?,?);";

// Mantener Maestro de Productos
export const queryMantenerProducto = "call `sp_mantenerProducto`(?,?,?);";

// UPSERT (insertar o actualizar si existe)
export const queryUpsertProducto = `
  INSERT INTO productos (
    sap,
    nombreProducto,
    precioUSD,
    unidadMedida,
    usuarioInsercion
  )
  VALUES ?
  ON DUPLICATE KEY UPDATE
    sap = VALUES(sap),
    nombreProducto = VALUES(nombreProducto),
    precioUSD = VALUES(precioUSD),
    unidadMedida = VALUES(unidadMedida),
    usuarioEdicion = VALUES(usuarioInsercion),
    fechaEdicion = CURRENT_TIMESTAMP();
`;

export const queryBuscarProducto = "call `sp_buscarProducto`(?);";