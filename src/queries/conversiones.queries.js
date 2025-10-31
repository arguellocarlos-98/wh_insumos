// ABM de Monedas y Conversiones

// Insertar Conversion
export const queryInsertarConversion = "CALL sp_insertarConversion(?,?,?,?);";
// Editar Conversion
export const queryEditarConversion = "CALL sp_editarConversion(?,?,?,?,?);";
// Listar Conversion
export const queryListarConversion = "CALL `sp_listarConversion`(?);";
// Mantener Conversion
export const queryMantenerConversion = "CALL `sp_mantenerConversion`(?,?,?);";