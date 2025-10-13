import * as Sentry from "@sentry/node";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import { queryEditarBodegas, queryInsertarBodega, queryListarBodegas, queryMantenerBodega } from "../queries/bodegas.queries.js";

export const modelListarBodega = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarBodegas, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoBodega, codigoDeposito, nombreDeposito, nombreBodega, estadoBodega }) => ({
            codigoBodega,
            codigoDeposito,
            nombreDeposito,
            nombreBodega,
            estadoBodega: estadoBodega === 1
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

export const modelInsertarBodega = async (parametros) => {
    const paramsQuery = [
        parametros.codigoDeposito,
        parametros.nombreBodega,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarBodega, paramsQuery);
        if (!result.estado) return result;
        const codigoBodega = result.data[0]?.codigoBodega ?? null;
        return {
            estado: true,
            codigoBodega
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarBodega = async (parametros) => {
    const paramsQuery = [
        parametros.codigoDeposito,
        parametros.nombreBodega,
        parametros.codigoUsuario,
        parametros.codigoBodega
    ];

    try {
        const result = await actualizarProcedure(queryEditarBodegas, paramsQuery);
        if (!result.estado) return result;
        return {
            estado: true,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelMantenerBodega = async (parametros) => {
    const paramsQuery = [
        parametros.estadoBodega,
        parametros.codigoUsuario,
        parametros.codigoBodega
    ];

    try {
        const result = await actualizarProcedure(queryMantenerBodega, paramsQuery);
        if (!result.estado) return result;
        return {
            estado: true,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};