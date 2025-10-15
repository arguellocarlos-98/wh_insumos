// ABM de Maestro de Productos
// Listar Maestro de Productos
export const queryListarProducto = "call `sp_listarProducto`(?);";

// Insertar Maestro de Productos
export const queryInsertarProducto = "call `sp_insertarProducto`(?,?,?,?,?,?,?,?,?,?,?);";

// Editar Maestro de Productos
export const queryEditarProducto = "call `sp_editarProducto`(?,?,?,?,?,?,?,?,?,?,?,?);";

// Mantener Maestro de Productos
export const queryMantenerProducto = "call `sp_mantenerProducto`(?,?,?);";