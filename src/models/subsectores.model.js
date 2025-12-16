import * as Sentry from "@sentry/node";
import { queryEditarSubsector, queryInsertarSubsector, queryListarSubsector, queryMantenerSubsector } from "../queries/subsectores.queries.js";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";

export const modelListarSubsector = async (params) => {
    const paramsQuery = [
        params.codigoSucursal,
        params.filtro
    ];

    try {
        const result = await listarProcedure(queryListarSubsector, paramsQuery);
        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoSubsector, codigoSector, nombreSector, nombreSubsector, estadoSubsector }) => ({
            codigoSubsector,
            codigoSector,
            nombreSector,
            nombreSubsector,
            estadoSubsector: estadoSubsector === 1
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

export const modelInsertarSubsector = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSector,
        parametros.nombreSubsector,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarSubsector, paramsQuery);

        const codigoSubsector = result.data[0]?.codigoSubsector ?? null;
        return {
            estado: true,
            codigoSubsector
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarSubsector = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSector,
        parametros.nombreSubsector,
        parametros.codigoUsuario,
        parametros.codigoSubsector
    ];

    try {
        const result = await actualizarProcedure(queryEditarSubsector, paramsQuery);

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

export const modelMantenerSubsector = async (parametros) => {
    const paramsQuery = [
        parametros.estadoSubsector,
        parametros.codigoUsuario,
        parametros.codigoSubsector
    ];

    try {
        const result = await actualizarProcedure(queryMantenerSubsector, paramsQuery);

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