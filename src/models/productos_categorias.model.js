import * as Sentry from "@sentry/node";
import { queryEditarCategoria, queryInsertarCategoria, queryListarCategoria, queryMantenerCategoria } from "../queries/productos_categorias.queries.js";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";

export const modelListarCategoria = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarCategoria, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoCategoria, nombreCategoria, estadoCategoria }) => ({
            codigoCategoria,
            nombreCategoria,
            estadoCategoria: estadoCategoria === 1
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

export const modelInsertarCategoria = async (parametros) => {
    const paramsQuery = [
        parametros.nombreCategoria,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarCategoria, paramsQuery);
        if (!result.estado) return estado;

        const codigoCategoria = result.data[0]?.codigoCategoria ?? null;
        return {
            estado: true,
            codigoCategoria
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarCategoria = async (parametros) => {
    const paramsQuery = [
        parametros.nombreCategoria,
        parametros.codigoUsuario,
        parametros.codigoCategoria
    ];

    try {
        const result = await actualizarProcedure(queryEditarCategoria, paramsQuery);
        if (!result.estado) return estado;

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

export const modelMantenerCategoria = async (parametros) => {
    const paramsQuery = [
        parametros.estadoCategoria,
        parametros.codigoUsuario,
        parametros.codigoCategoria
    ];

    try {
        const result = await actualizarProcedure(queryMantenerCategoria, paramsQuery);
        if (!result.estado) return estado;

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