import * as Sentry from "@sentry/node";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import { queryEditarSector, queryInsertarSector, queryListarSector, queryMantenerSector } from "../queries/sectores.queries.js";

export const modelListarSector = async (params) => {
    const paramsQuery = [
        params.codigoSucursal,
        params.filtro
    ];

    try {
        const result = await listarProcedure(queryListarSector, paramsQuery);
        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoSector, nombreSector, estadoSector }) => ({
            codigoSector,
            nombreSector,
            estadoSector: estadoSector === 1
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

export const modelInsertarSector = async (parametros) => {
    const paramsQuery = [
        parametros.nombreSector,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarSector, paramsQuery);

        const codigoSector = result.data[0]?.codigoSector ?? null;
        return {
            estado: true,
            codigoSector
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarSector = async (parametros) => {
    const paramsQuery = [
        parametros.nombreSector,
        parametros.codigoUsuario,
        parametros.codigoSector
    ];

    try {
        const result = await actualizarProcedure(queryEditarSector, paramsQuery);

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

export const modelMantenerSector = async (parametros) => {
    const paramsQuery = [
        parametros.estadoSector,
        parametros.codigoUsuario,
        parametros.codigoSector
    ];

    try {
        const result = await actualizarProcedure(queryMantenerSector, paramsQuery);

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