// ABM de Monedas y Conversiones

// Insertar Moneda
export const queryInsertarMoneda = "CALL sp_insertarMoneda(?,?,?,?,?);";
// Editar Moneda
export const queryEditarMoneda = "CALL sp_editarMoneda(?,?,?,?,?,?);";
// Listar Moneda
export const queryListarMoneda = "CALL `sp_listarMoneda`(?);";
// Mantener Moneda
export const queryMantenerMoneda = "CALL `sp_mantenerMoneda`(?,?,?);";