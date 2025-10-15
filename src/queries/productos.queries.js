// ABM de Maestro de Productos
// Listar Maestro de Productos
export const queryListarProducto = "call `sp_listarProducto`(?);";

// Insertar Maestro de Productos
export const queryInsertarProducto = "call `sp_insertarProducto`(?,?,?,?,?,?,?,?,?,?,?);";

// Editar Maestro de Productos
export const queryEditarProducto = "call `sp_editarProducto`(?,?,?,?,?,?,?,?,?,?,?,?);";

// Mantener Maestro de Productos
export const queryMantenerProducto = "call `sp_mantenerProducto`(?,?,?);";

// UPSERT (insertar o actualizar si existe)
export const queryUpsertProducto = `
  INSERT INTO productos (
    codigoCategoria,
    truck,
    sap,
    ean,
    nombreProducto,
    bultoPallet,
    unidadCaja,
    vigenciaProducto,
    bloqueoProducto,
    precioUSD,
    usuarioInsercion
  )
  VALUES ?
  ON DUPLICATE KEY UPDATE
    codigoCategoria = values(codigoCategoria),
    truck = values(truck),
    sap = values(sap),
    ean = values(ean),
    nombreProducto = VALUES(nombreProducto),
    bultoPallet = VALUES(bultoPallet),
    unidadCaja = VALUES(unidadCaja),
    vigenciaProducto = VALUES(vigenciaProducto),
    bloqueoProducto = values(bloqueoProducto),
    precioUSD = values(precioUSD),
    usuarioEdicion = values(usuarioInsercion);
`;
