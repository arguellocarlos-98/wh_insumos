// Listado de Consultas para ABM de Bodegas
// Listar Bodegas
export const queryListarBodegas = "call `sp_listarBodega`(?,?);";
// Insertar Bodegas
export const queryInsertarBodega = "call `sp_insertarBodega`(?,?,?);";
// Editar Bodegas
export const queryEditarBodegas = "call `sp_editarBodega`(?,?,?,?);";
// Mantener Bodegas
export const queryMantenerBodega = "call `sp_mantenerBodega`(?,?,?);";