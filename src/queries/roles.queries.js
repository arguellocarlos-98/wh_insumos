// Consultas de Roles de Usuario
// Listar Roles de Usuario
export const queryListarRol = "call `sp_listarRol`(?,?);";
// Insertar Rol
export const queryInsertarRol = "call `sp_insertarRol`(?,?);";
// Editar Rol
export const queryEditarRol = "call `sp_editarRol`(?,?,?);";
// Mantener Rol
export const queryMantenerRol = "call `sp_mantenerRol`(?,?,?);";