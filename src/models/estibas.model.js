import * as Sentry from "@sentry/node";
import { queryEditarEstiba, queryInsertarEstiba, queryListarEstiba, queryMantenerEstiba } from "../queries/estibas.queries.js";
import { listarProcedure, insertarProcedure, actualizarProcedure } from "../db/operations.db.js";

export const modelListarEstiba = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarEstiba, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoEstiba, codigoRotacion, nombreRotacion, colorRotacion, codigoZona, nombreZona, nombreBodega, nombreDeposito, sapDeposito, nombreEstiba, almacenamientoEstiba, capacidadMaxima, nivelEstiba, pri, estadoEstiba }) => ({
            codigoEstiba,
            sapDeposito,
            nombreDeposito,
            nombreBodega,
            codigoZona,
            nombreZona,
            codigoRotacion,
            colorRotacion,
            nombreRotacion,
            nombreEstiba,
            almacenamientoEstiba,
            capacidadMaxima,
            nivelEstiba,
            pri: pri === 1,
            estadoEstiba: estadoEstiba === 1
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

export const modelInsertarEstiba = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRotacion,
        parametros.codigoZona,
        parametros.nombreEstiba,
        parametros.capacidadMaxima,
        parametros.pri,
        parametros.codigoUsuario,
    ];

    try {
        const result = await insertarProcedure(queryInsertarEstiba, paramsQuery);
        if (!result.estado) return result;
        const codigoEstiba = result.data[0]?.codigoEstiba ?? null;

        return {
            estado: true,
            codigoEstiba
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarEstiba = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRotacion,
        parametros.codigoZona,
        parametros.nombreEstiba,
        parametros.capacidadMaxima,
        parametros.pri,
        parametros.codigoUsuario,
        parametros.codigoEstiba,
    ];

    try {
        const result = await actualizarProcedure(queryEditarEstiba, paramsQuery);
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

export const modelMantenerEstiba = async (parametros) => {
    const paramsQuery = [
        parametros.estadoEstiba,
        parametros.codigoUsuario,
        parametros.codigoEstiba,
    ];

    try {
        const result = await actualizarProcedure(queryMantenerEstiba, paramsQuery);
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