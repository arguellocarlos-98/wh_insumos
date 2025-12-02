// LISTADO DE CONSULTAS PARA ABM DE REMITOS

// Insertar Encabezado de Remito
export const queryInsertarRemito = "CALL `sp_insertarRemito`(?,?,?,?,?);";

// Insertar Detalle de Remito
export const queryInsertarRemitoDetalle = "call `sp_insertarRemitoDetalle`(?,?,?,?,?);";

// Insertar Indicadores del Remito
export const queryInsertarRemitoIndicador = "CALL `sp_insertarRemitoIndicador`(?,?,?);";