import * as Sentry from "@sentry/node";
import {
    queryActualizarRemitoDetalle,
    queryAgregarStockxremito,
    queryBuscarRemitoPreparado,
    queryBuscarRemitoRecibido,
    queryConfirmarRemito,
    queryDescontarStock,
    queryInsertarRemito,
    queryInsertarRemitoCheck,
    queryInsertarRemitoDetalle,
    queryInsertarRemitoIndicador,
    queryInsertarRemitoPanel,
    queryMostrarRemitoDetallexCod,
    queryRecibirRemito
} from "../queries/remitos.queries.js";

import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import moment from "moment";

// ------------------------------------------
// Función para insertar encabezado
// ------------------------------------------
const insertarEncabezado = async (params) => {
    const p = [
        params.tipoRemito,
        params.numeroPedido,
        params.observacionRemito,
        params.preparacionCarga,
        params.codigoUsuario
    ];
    return insertarProcedure(queryInsertarRemito, p);
};

// ------------------------------------------
// Función para insertar un detalle
// ------------------------------------------
const insertarDetalle = async (codigoRemito, det) => {
    const p = [
        codigoRemito,
        det.codigoStock,
        det.documentoSap,
        det.cantidadSolicitada,
        det.cantidadEnviada
    ];

    return insertarProcedure(queryInsertarRemitoDetalle, p);
};

// ------------------------------------------
// Función para insertar indicadores
// ------------------------------------------
const insertarIndicador = async (codigoRemito, det) => {
    const p = [
        codigoRemito,
        det.codigoIndicador,
        det.checkRemitoIndicador
    ];

    return insertarProcedure(queryInsertarRemitoIndicador, p);
};

// ------------------------------------------
// Modelo principal
// ------------------------------------------
export const modelInsertarRemito = async (params) => {
    try {
        // 1) Insertar encabezado
        const encabezado = await insertarEncabezado(params);

        const codigoRemito = encabezado.data[0]?.codigoRemito;
        if (!codigoRemito) throw new Error("No se obtuvo codigoRemito");

        // 2) Insertar detalles (si existen)
        if (Array.isArray(params.detalle) && params.detalle.length > 0) {
            for (const det of params.detalle) {
                const resultDet = await insertarDetalle(codigoRemito, det);
                if (!resultDet.estado) return resultDet;
            }
        };

        // 2) Insertar detalles (si existen)
        if (Array.isArray(params.indicadores) && params.indicadores.length > 0) {
            for (const indicador of params.indicadores) {
                const resultIndicador = await insertarIndicador(codigoRemito, indicador);
                if (!resultIndicador.estado) return resultIndicador;
            }
        };

        // 4) Respuesta final
        return {
            estado: true,
            codigoRemito
        };

    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelBuscarRemitoPreparado = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.fechaInicio,
        parametros.fechaFin
    ];

    try {
        const result = await listarProcedure(queryBuscarRemitoPreparado, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoRemito, fechaRemito, tipoRemito, observacionRemito, preparacionCarga, Usuario }) => ({
            codigoRemito,
            fechaRemito: moment(fechaRemito).format("yyyy-MM-DD"),
            tipoRemito,
            observacionRemito,
            preparacionCarga: preparacionCarga === 1,
            Usuario
        })) : [];
        return {
            estado: true,
            found,
            data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelMostrarRemitoDetallexCod = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRemito
    ];

    try {
        const result = await listarProcedure(queryMostrarRemitoDetallexCod, paramsQuery);

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoStock, nombreEstiba, nombreZona, nombreBodega, nombreDeposito, sap, nombreProducto, cantidadSolicitada, unidadMedida, lotePlanta, loteProducto, estadoRemitoDetalle }) => ({
            codigoStock,
            nombreEstiba,
            nombreZona,
            nombreBodega,
            nombreDeposito,
            sap,
            nombreProducto,
            cantidadSolicitada,
            unidadMedida,
            lotePlanta,
            loteProducto,
            estadoRemitoDetalle: estadoRemitoDetalle === 1
        })) : [];
        return {
            estado: true,
            found,
            data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelConfirmarRemito = async (parametros) => {
    const paramsQueryEncabezado = [
        parametros.codigoDeposito,
        parametros.codigoUsuario,
        parametros.remitoSalida,
        parametros.observacionRemito,
        parametros.codigoRemito
    ];

    try {
        const result = await actualizarProcedure(queryConfirmarRemito, paramsQueryEncabezado);

        if (Array.isArray(parametros.detalle)) {
            for (const item of parametros.detalle) {
                const paramsDetalle = [
                    parametros.codigoRemito,
                    item.codigoStock,
                    item.cantidadEnviada,
                    item.estadoRemitoDetalle ? 1 : 0
                ];

                const detResult = await actualizarProcedure(queryActualizarRemitoDetalle, paramsDetalle);
                if (!detResult.estado) return detResult;

                // 2) Descontar Stock
                const paramsDescuento = [
                    item.codigoStock,
                    item.cantidadEnviada,
                    parametros.codigoUsuario
                ];
                const descResult = await actualizarProcedure(queryDescontarStock, paramsDescuento);
                if (!descResult.estado) return descResult;
            }
        };

        return {
            estado: true,
            found: true,
            data: {
                encabezado: result.data,
                detalle: parametros.detalle?.length || 0
            }
        };

    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelBuscarRemitoRecibido = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.fechaInicio,
        parametros.fechaFin
    ];

    try {
        const result = await listarProcedure(queryBuscarRemitoRecibido, paramsQuery);

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoRemito, codigoDeposito, nombreDeposito, sapDeposito, fechaRemito, observacionRemito, Usuario }) => ({
            codigoRemito,
            codigoDeposito,
            nombreDeposito,
            sapDeposito,
            fechaRemito: moment(fechaRemito).format("YYYY-MM-DD"),
            observacionRemito,
            Usuario
        })) : [];
        return {
            estado: true,
            found,
            data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelRecibirRemito = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRemito,
        parametros.codigoUsuario
    ];

    try {
        // 1) Actualizar encabezado del remito como recibido
        const result = await actualizarProcedure(queryRecibirRemito, paramsQuery);

        // 2) Procesar detalles (clonar stock)
        if (Array.isArray(parametros.detalle)) {
            for (const item of parametros.detalle) {
                const paramsDetalle = [
                    item.codigoStock,           // stock original
                    item.codigoEstiba,          // nueva ubicación
                    item.cantidadEnviada,       // cantidad a clonar
                    parametros.codigoUsuario    // usuario de inserción
                ];

                const detResult = await insertarProcedure(queryAgregarStockxremito, paramsDetalle);
                if (!detResult.estado) { return detResult; }
            }
        };

        return {
            estado: result.estado,
            found: result.found,
            data: {
                encabezado: result.data,
                detalleProcesado: parametros.detalle?.length || 0
            }
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

const insertarEncabezadoPanel = async (params) => {
    const p = [
        params.codigoDeposito,
        params.tipoRemito,
        params.numeroPedido,
        params.remitoSalida,
        params.observacionRemito,
        params.codigoUsuario
    ];
    return insertarProcedure(queryInsertarRemitoPanel, p);
};

export const modelInsertarRemitoPanel = async (params) => {
    try {
        const encabezado = await insertarEncabezadoPanel(params);
        const codigoRemito = encabezado.data[0]?.codigoRemito;
        if (!codigoRemito) throw new Error("No se obtuvo codigoRemito");

        if (Array.isArray(params.detalle) && params.detalle.length > 0) {
            for (const det of params.detalle) {
                const resultDet = await insertarDetalle(codigoRemito, det);
                if (!resultDet.estado) return resultDet;
            }
        };

        if (Array.isArray(params.indicadores) && params.indicadores.length > 0) {
            for (const indicador of params.indicadores) {
                const resultIndicador = await insertarIndicador(codigoRemito, indicador);
                if (!resultIndicador.estado) return resultIndicador;
            }
        };
        return {
            estado: true,
            codigoRemito
        };

    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

const insertarEncabezadoCheck = async (params) => {
    const p = [
        params.codigoSubsector,
        params.codigoDeposito,
        params.tipoRemito,
        params.numeroPedido,
        params.remitoSalida,
        params.observacionRemito,
        params.codigoUsuario
    ];
    return insertarProcedure(queryInsertarRemitoCheck, p);
};

export const modelInsertarRemitoCheck = async (params) => {
    try {
        const encabezado = await insertarEncabezadoCheck(params);
        const codigoRemito = encabezado.data[0]?.codigoRemito;
        if (!codigoRemito) throw new Error("No se obtuvo codigoRemito");

        if (Array.isArray(params.detalle) && params.detalle.length > 0) {
            for (const det of params.detalle) {
                const resultDet = await insertarDetalle(codigoRemito, det);
                if (!resultDet.estado) return resultDet;
            }
        };

        if (Array.isArray(params.indicadores) && params.indicadores.length > 0) {
            for (const indicador of params.indicadores) {
                const resultIndicador = await insertarIndicador(codigoRemito, indicador);
                if (!resultIndicador.estado) return resultIndicador;
            }
        };
        return {
            estado: true,
            codigoRemito
        };

    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};