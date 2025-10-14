import * as Sentry from '@sentry/node';
import { actualizarProcedure, insertarProcedure, listarProcedure } from '../db/operations.db.js';
import { query_sp_editarDeposito, query_sp_insertarDeposito, query_sp_listarDeposito, query_sp_mantenerDeposito } from '../queries/depositos.queries.js';

export const modelInsertarDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.sapDeposito,
        parametros.nombreDeposito,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(query_sp_insertarDeposito, paramsQuery);
        if (!result.estado) return result;
        const codigoDeposito = result.data[0]?.codigoDeposito ?? null;
        return {
            estado: true,
            codigoDeposito
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.sapDeposito,
        parametros.nombreDeposito,
        parametros.codigoUsuario,
        parametros.codigoDeposito
    ];

    try {
        const result = await actualizarProcedure(query_sp_editarDeposito, paramsQuery);
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

export const modelListarDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(query_sp_listarDeposito, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoDeposito, sapDeposito, nombreDeposito, estadoDeposito }) => ({
            codigoDeposito,
            sapDeposito,
            nombreDeposito,
            estadoDeposito: estadoDeposito === 1
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

export const modelMantenerDeposito = async (parametros) => {
    const paramsQuery = [
        parametros.estadoDeposito,
        parametros.codigoUsuario,
        parametros.codigoDeposito
    ];

    try {
        const result = await actualizarProcedure(query_sp_mantenerDeposito, paramsQuery);
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