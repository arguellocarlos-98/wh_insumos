// LISTADO DE CONSULTAS CRUD PARA INDICADORES DE REMITO

// Listar Indicadores
export const queryListarIndicador = "CALL `sp_listarIndicador`(?,?,?);";
// Insertar Indicadores
export const queryInsertarIndicador = "CALL `sp_insertarIndicador`(?,?,?);";
// Editar Indicadores
export const queryEditarIndicador = "CALL `sp_editarIndicador`(?,?,?,?);";
// Mantener Indicadores
export const queryMantenerIndicador = "CALL `sp_mantenerIndicador`(?,?,?);";