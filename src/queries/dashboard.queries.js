// ABM DE QUERIES DE DASHBOARD
// DASHBOARD DE PRODUCTOS POR CODIGO DE DEPOSITO
export const queryDashboardProdutos = "CALL `sp_dashboardProductos`(?);";

// DASHBOARD DE REMITOS POR CODIGO DE SUCURSAL
export const queryDashboardRemito = "CALL `sp_dashboardRemito`(?);";

// DASHBOARD DE ULTIMOS REMITOS GENERADOS
export const queryUltimosRemitos = "CALL `sp_dashboardRemitoUltimo`(?);";

// DASHBOARD DE VENCIMIENTOS PROXIMOS LITE
export const queryDashboardVencimientoProximo = "CALL `sp_dashboardVencimientoProximo`(?);";