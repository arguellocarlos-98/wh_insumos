import * as Sentry from "@sentry/node";
import { queryListarIndicador, queryInsertarIndicador, queryEditarIndicador, queryMantenerIndicador } from "../queries/indicadores.queries.js";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";

export const modelListarIndicador = async (params) => {
    const paramsQuery = [
        params.codigoSucursal,
        params.filtro,
        params.tipoIndicador
    ];

    try {
        const result = await listarProcedure(queryListarIndicador, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoIndicador, tipoIndicador, nombreIndicador, estadoIndicador }) => ({
            codigoIndicador,
            tipoIndicador,
            nombreIndicador,
            estadoIndicador: estadoIndicador === 1
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

export const modelInsertarIndicador = async (params) => {
    const paramsQuery = [
        params.tipoIndicador,
        params.nombreIndicador,
        params.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarIndicador, paramsQuery);
        if (!result.estado) return result;

        const codigoIndicador = result.data[0]?.codigoIndicador ?? null;
        return {
            estado: true,
            codigoIndicador
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarIndicador = async (params) => {
    const paramsQuery = [
        params.tipoIndicador,
        params.nombreIndicador,
        params.codigoUsuario,
        params.codigoIndicador
    ];

    try {
        const result = await actualizarProcedure(queryEditarIndicador, paramsQuery);
        if (!result.estado) return result;

        return {
            estado: true,
            found: result.found,
            data: result.data
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelMantenerIndicador = async (params) => {
    const paramsQuery = [
        params.estadoIndicador,
        params.codigoUsuario,
        params.codigoIndicador
    ];

    try {
        const result = await actualizarProcedure(queryMantenerIndicador, paramsQuery);
        if (!result.estado) return result;

        return {
            estado: true,
            found: result.found,
            data: result.data
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};