import * as Sentry from "@sentry/node";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import { queryEditarRotacion, queryInsertarRotacion, queryListarRotacion, queryMantenerRotacion } from "../queries/rotaciones.queries.js";

export const modelListarRotacion = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarRotacion, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoRotacion, nombreRotacion, colorRotacion, estadoRotacion }) => ({
            codigoRotacion,
            nombreRotacion,
            colorRotacion,
            estadoRotacion: estadoRotacion === 1
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

export const modelInsertarRotacion = async (parametros) => {
    const paramsQuery = [
        parametros.nombreRotacion,
        parametros.colorRotacion,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarRotacion, paramsQuery);
        if (!result.estado) return result;

        const codigoRotacion = result.data[0]?.codigoRotacion ?? null;
        return {
            estado: true,
            codigoRotacion
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarRotacion = async (parametros) => {
    const paramsQuery = [
        parametros.nombreRotacion,
        parametros.colorRotacion,
        parametros.codigoUsuario,
        parametros.codigoRotacion
    ];

    try {
        const result = await actualizarProcedure(queryEditarRotacion, paramsQuery);
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

export const modelMantenerRotacion = async (parametros) => {
    const paramsQuery = [
        parametros.estadoRotacion,
        parametros.codigoUsuario,
        parametros.codigoRotacion
    ];

    try {
        const result = await actualizarProcedure(queryMantenerRotacion, paramsQuery);
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