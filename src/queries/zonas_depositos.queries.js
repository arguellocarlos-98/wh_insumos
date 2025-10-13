// Consultas para el ABM de Zonas de Depositos (Bodega Dependiente)
// Listar Zonas de Deposito
export const queryListarZonaDeposito = "call `sp_listarZonaDeposito`(?,?);";
// Insertar Zonas
export const queryInsertarZonaDeposito = "call `sp_insertarZonaDeposito`(?,?,?);";
// Editar Zonas
export const queryEditarZonaDeposito = "call `sp_editarZonaDeposito`(?,?,?,?);";
// Mantener Zonas
export const queryMantenerZonaDeposito = "call `sp_mantenerZonaDeposito`(?,?,?);";