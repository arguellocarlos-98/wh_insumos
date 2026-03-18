// CONSULTAS PARA DASHBOARD DE TRAZABILIDAD DE PRODUCTOS
export const trazabilidadQueries = {
    sp_reporteTrazabilidadResumen: "call `sp_reporteTrazabilidadResumen`(?);",
    sp_reporteTrazabilidadEntrada: "call `sp_reporteTrazabilidadEntrada`(?);",
    sp_reporteTrazabilidadSalida: "call `sp_reporteTrazabilidadSalida`(?);",
    sp_reporteTrazabilidadSectorial: "CALL `sp_reporteTrazabilidadSectorial`(?);",
    sp_reporteTrazabilidadCronologico: "call `sp_reporteTrazabilidadCronologico`(?);"
};