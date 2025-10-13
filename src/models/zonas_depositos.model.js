import * as Sentry from "@sentry/node";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import { queryInsertarZonaDeposito, queryListarZonaDeposito, queryEditarZonaDeposito, queryMantenerZonaDeposito } from "../queries/zonas_depositos.queries.js";

export const modelListarZonaDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarZonaDeposito, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoZona, codigoDeposito, nombreDeposito, sapDeposito, codigoBodega, nombreBodega, nombreZona, estadoZona }) => ({
            codigoZona,
            codigoDeposito,
            nombreDeposito,
            sapDeposito,
            codigoBodega,
            nombreBodega,
            nombreZona,
            estadoZona: estadoZona === 1
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

export const modelInsertarZonaDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.codigoBodega,
        parametros.nombreZona,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarZonaDeposito, paramsQuery);
        if (!result.estado) return result;

        const codigoZona = result.data[0]?.codigoZona ?? null;
        return {
            estado: true,
            codigoZona
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarZonaDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.codigoBodega,
        parametros.nombreZona,
        parametros.codigoUsuario,
        parametros.codigoZona
    ];

    try {
        const result = await actualizarProcedure(queryEditarZonaDeposito, paramsQuery);
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

export const modelMantenerZonaDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.estadoZona,
        parametros.codigoUsuario,
        parametros.codigoZona
    ];

    try {
        const result = await actualizarProcedure(queryMantenerZonaDeposito, paramsQuery);
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