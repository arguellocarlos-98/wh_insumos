// Consultas de Deposito
// Insertar Depositos
export const query_sp_insertarDeposito = "call `sp_insertarDeposito`(?,?,?);";
// Editar Depositos
export const query_sp_editarDeposito = "call `sp_editarDeposito`(?,?,?,?);";
// Listar Depositos
export const query_sp_listarDeposito = "call `sp_listarDeposito`(?,?);";
// Activar - Desactivar Depositos
export const query_sp_mantenerDeposito = "call `sp_mantenerDeposito`(?,?,?);";