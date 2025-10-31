import * as Sentry from "@sentry/node";

import { listarProcedure, insertarProcedure, actualizarProcedure, upsertCSV } from "../db/operations.db.js";
import { queryListarProducto, queryInsertarProducto, queryEditarProducto, queryMantenerProducto, queryUpsertProducto, queryBuscarProducto } from "../queries/productos.queries.js";

export const modelListarProducto = async (parametros) => {
    const paramsQuery = [
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarProducto, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoProducto, codigoCategoria, nombreCategoria, codigoRotacion, nombreRotacion, colorRotacion, truck, sap, ean, nombreProducto, bultoPallet, unidadCaja, vigenciaProducto, bloqueoProducto, precioUSD, estadoProducto }) => ({
            codigoProducto,
            codigoCategoria,
            nombreCategoria,
            codigoRotacion,
            nombreRotacion,
            colorRotacion,
            truck,
            sap,
            ean,
            nombreProducto,
            bultoPallet,
            unidadCaja,
            vigenciaProducto,
            bloqueoProducto,
            precioUSD,
            estadoProducto: estadoProducto === 1
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

export const modelInsertarProducto = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRotacion,
        parametros.codigoCategoria,
        parametros.truck,
        parametros.sap,
        parametros.ean,
        parametros.nombreProducto,
        parametros.bultoPallet,
        parametros.unidadCaja,
        parametros.vigenciaProducto,
        parametros.bloqueoProducto,
        parametros.precioUSD,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarProducto, paramsQuery);
        if (!result.estado) return result;

        const codigoProducto = result.data[0]?.codigoProducto ?? null;
        return {
            estado: true,
            codigoProducto
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarProducto = async (parametros) => {
    const paramsQuery = [
        parametros.codigoRotacion,
        parametros.codigoCategoria,
        parametros.truck,
        parametros.sap,
        parametros.ean,
        parametros.nombreProducto,
        parametros.bultoPallet,
        parametros.unidadCaja,
        parametros.vigenciaProducto,
        parametros.bloqueoProducto,
        parametros.precioUSD,
        parametros.codigoUsuario,
        parametros.codigoProducto
    ];

    try {
        const result = await actualizarProcedure(queryEditarProducto, paramsQuery);
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

export const modelMantenerProducto = async (parametros) => {
    const paramsQuery = [
        parametros.estadoProducto,
        parametros.codigoUsuario,
        parametros.codigoProducto
    ];

    try {
        const result = await actualizarProcedure(queryMantenerProducto, paramsQuery);
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

export const upsertProductosDesdeCSV = async (rutaCSV) => {
    const columnas = [
        "sap",
        "nombreProducto",
        "precioUSD",
        "unidadMedida",
        "codigoUsuario"
    ];
    try {
        return await upsertCSV(rutaCSV, columnas, queryUpsertProducto);
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelBuscarProducto = async (parametros) => {
    const paramsQuery = [
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryBuscarProducto, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoProducto, codigoCategoria, nombreCategoria, codigoRotacion, nombreRotacion, colorRotacion, truck, sap, ean, nombreProducto, bultoPallet, unidadCaja, vigenciaProducto, bloqueoProducto, precioUSD, estadoProducto }) => ({
            codigoProducto,
            codigoCategoria,
            nombreCategoria,
            codigoRotacion,
            nombreRotacion,
            colorRotacion,
            truck,
            sap,
            ean,
            nombreProducto,
            bultoPallet,
            unidadCaja,
            vigenciaProducto,
            bloqueoProducto,
            precioUSD,
            estadoProducto: estadoProducto === 1
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
