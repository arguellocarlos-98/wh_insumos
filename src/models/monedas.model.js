import { listarProcedure, insertarProcedure, actualizarProcedure } from "../db/operations.db.js";
import { queryEditarMoneda, queryInsertarMoneda, queryListarMoneda, queryMantenerMoneda } from "../queries/monedas.queries.js";
import * as Sentry from "@sentry/node";

export const modelInsertarMoneda = async (params) => {
    const paramsQuery = [
        params.siglaMoneda,
        params.nombreMoneda,
        params.simboloMoneda,
        params.esBase,
        params.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarMoneda, paramsQuery);
        if (!result.estado) return result;
        const codigoMoneda = result.data[0]?.codigoMoneda ?? null;

        return {
            estado: true,
            codigoMoneda
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarMoneda = async (params) => {
    const paramsQuery = [
        params.siglaMoneda,
        params.nombreMoneda,
        params.simboloMoneda,
        params.esBase,
        params.codigoUsuario,
        params.codigoMoneda
    ];

    try {
        const result = await actualizarProcedure(queryEditarMoneda, paramsQuery);
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

export const modelMantenerMoneda = async (params) => {
    const paramsQuery = [
        params.estadoMoneda,
        params.codigoUsuario,
        params.codigoMoneda
    ];

    try {
        const result = await actualizarProcedure(queryMantenerMoneda, paramsQuery);
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

export const modelListarMoneda = async (params) => {
    const paramsQuery = [params.filtro];

    try {
        const result = await listarProcedure(queryListarMoneda, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoMoneda, siglaMoneda, nombreMoneda, simboloMoneda, esBase, estadoMoneda }) => ({
            codigoMoneda,
            siglaMoneda,
            nombreMoneda,
            simboloMoneda,
            esBase: esBase === 1,
            estadoMoneda: estadoMoneda === 1
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