// LISTADO DE CONSULTAS PARA ABM DE REMITOS

// Insertar Encabezado de Remito
export const queryInsertarRemito = "CALL `sp_insertarRemito`(?,?,?,?,?);";

// Insertar Detalle de Remito
export const queryInsertarRemitoDetalle = "CALL `sp_insertarRemitoDetalle`(?,?,?,?,?);";

// Insertar Indicadores del Remito
export const queryInsertarRemitoIndicador = "CALL `sp_insertarRemitoIndicador`(?,?,?);";

// Listar Cargas Preparadas por Fecha
export const queryBuscarRemitoPreparado = "CALL `sp_buscarRemitoPreparado`(?,?,?);";

// Mostrar Contenido del Remito
export const queryMostrarRemitoDetallexCod = "CALL `sp_mostrarRemitoDetallexCod`(?);";

// Confirmar Remito como Entregado (Encabezado)
export const queryConfirmarRemito = "call `sp_confirmarRemito`(?,?,?,?,?);";

// Listar Remitos Recibidos
export const queryBuscarRemitoRecibido = "CALL `sp_buscarRemitoRecibido`(?,?,?);"

// Confirmar Remito como Listo (Detalle)
export const queryActualizarRemitoDetalle = "CALL `sp_actualizarRemitoDetalle`(?,?,?,?);";

// Confirmar Remito como Recibido
export const queryRecibirRemito = "CALL `sp_recibirRemito`(?,?);";

// Agregar al Stock desde el Remito de Salida (Recepcion)
export const queryAgregarStockxremito = "";