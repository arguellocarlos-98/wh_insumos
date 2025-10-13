// Listado de Consultas para segmento de Usuarios

// Insertar Usuario Nuevo
export const queryInsertarUsuario = "CALL `sp_insertarUsuario`(?,?,?,?,?,?,?);";
// Loguear Usuario
export const queryLoginUsuario = "CALL `sp_loginUsuario`(?);";
// Editar Usuario
export const queryEditarUsuario = "CALL `sp_editarUsuario`(?,?,?,?,?,?,?,?);";
// Listar Usuarios
export const querylistarUsuario = "call `sp_listarUsuario`(?,?);";
// Activar - Desactivar Usuarios
export const queryMantenerUsuario = "call `sp_mantenerUsuario`(?,?,?);";