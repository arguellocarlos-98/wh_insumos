import * as Sentry from "@sentry/node";
import {
    queryActualizarRemitoDetalle,
    queryAgregarStockxremito,
    queryBuscarRemitoPreparado,
    queryBuscarRemitoRecibido,
    queryConfirmarRemito,
    queryInsertarRemito,
    queryInsertarRemitoDetalle,
    queryInsertarRemitoIndicador,
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
        if (!encabezado.estado) return encabezado;

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
        if (!result.estado) return result;

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
        if (!result.estado) return result;

        if (Array.isArray(parametros.detalle)) {
            for (const item of parametros.detalle) {
                const paramsDetalle = [
                    parametros.codigoRemito,
                    item.codigoStock,
                    item.cantidadEnviada,
                    item.estadoRemitoDetalle ? 1 : 0
                ];

                const detResult = await actualizarProcedure(queryActualizarRemitoDetalle, paramsDetalle);
                if (!detResult.estado) { return detResult; }
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
        if (!result.estado) return result;

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
        const result = await actualizarProcedure(queryRecibirRemito, paramsQuery);
        if (!result.estado) return result;

        if (Array.isArray(parametros.detalle)) {
            for (const item of parametros.detalle) {
                const paramsDetalle = [
                    item.codigoEstiba,
                    item.cantidadEnviada
                ];

                const detResult = await actualizarProcedure(queryAgregarStockxremito, paramsDetalle);
                if (!detResult.estado) { return detResult; }
            }
        };

        return {
            estado: result.estado,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};