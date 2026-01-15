import * as Sentry from "@sentry/node";
import { listarProcedure, mostrarProcedure } from "../db/operations.db.js";
import { queryDashboardProdutos, queryDashboardRemito, queryDashboardVencimientoProximo, queryUltimosRemitos } from "../queries/dashboard.queries.js";

export const modelDashboardProductos = async (parametros) => {
    const paramsQuery = [parametros.codigoDeposito];

    try {
        const result = await mostrarProcedure(queryDashboardProdutos, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? {
            Cantidad: rows.Cantidad,
            Vencidos: rows.Vencidos,
            Valorizacion: parseInt(rows.Valorizacion)
        } : {};

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

export const modelDashboardRemito = async (parametros) => {
    const paramsQuery = [parametros.codigoDeposito];

    try {
        const result = await mostrarProcedure(queryDashboardRemito, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? {
            Entrada: parseInt(rows.Entrada),
            Salida: parseInt(rows.Salida),
            Sectorial: parseInt(rows.Sectorial),
            Pendiente: parseInt(rows.Pendiente),
        } : {};

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

export const modelDashboardUltimosRemitos = async (parametros) => {
    const paramsQuery = [parametros.codigoDeposito];

    try {
        const result = await listarProcedure(queryUltimosRemitos, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ codigoRemito, tipoRemito, numeroRemito, Responsable, Estado }) => ({
            codigoRemito,
            tipoRemito,
            numeroRemito,
            Responsable,
            Estado
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

export const modelDashboardVencimientoProximo = async (parametros) => {
    const paramsQuery = [parametros.codigoDeposito];

    try {
        const result = await listarProcedure(queryDashboardVencimientoProximo, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ codigoStock, sap, nombreProducto, Semaforo, Cantidad }) => ({
            codigoStock,
            SKU: sap,
            Material: nombreProducto,
            Semaforo,
            Cantidad,
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