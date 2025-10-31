import { listarProcedure, insertarProcedure, actualizarProcedure } from "../db/operations.db.js";
import { queryEditarConversion, queryInsertarConversion, queryListarConversion, queryMantenerConversion } from "../queries/conversiones.queries.js";
import * as Sentry from "@sentry/node";

export const modelInsertarConversion = async (params) => {
    const paramsQuery = [
        params.origenConversion,
        params.destinoConversion,
        params.tasaConversion,
        params.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarConversion, paramsQuery);
        if (!result.estado) return result;

        const codigoConversion = result.data[0]?.codigoConversion ?? null;

        return {
            estado: true,
            codigoConversion
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarConversion = async (params) => {
    const paramsQuery = [
        params.origenConversion,
        params.destinoConversion,
        params.tasaConversion,
        params.codigoUsuario,
        params.codigoConversion
    ];

    try {
        const result = await actualizarProcedure(queryEditarConversion, paramsQuery);
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

export const modelMantenerConversion = async (params) => {
    const paramsQuery = [
        params.estadoConversion,
        params.codigoUsuario,
        params.codigoConversion
    ];

    try {
        const result = await actualizarProcedure(queryMantenerConversion, paramsQuery);
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

export const modelListarConversion = async (params) => {
    const paramsQuery = [params.filtro];

    try {
        const result = await listarProcedure(queryListarConversion, paramsQuery);
        if (!result.estado) return result;

        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ codigoConversion, origenConversion, siglaOrigen, destinoConversion, siglaDestino, tasaConversion, estadoConversion }) => ({
            codigoConversion,
            origenConversion,
            siglaOrigen,
            destinoConversion,
            siglaDestino,
            tasaConversion,
            estadoConversion: estadoConversion === 1
        })) : [];
        return {
            estado: true,
            found,
            data
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};