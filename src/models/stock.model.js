import * as Sentry from "@sentry/node";
import { listarProcedure, insertarProcedure, actualizarProcedure } from "../db/operations.db.js";
import { queryEditarStock, queryInsertarStock, queryListarStock, queryMantenerStock, queryUpsertStockCSV } from "../queries/stock.queries.js";
import moment from "moment";

export const modelListarStock = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(queryListarStock, paramsQuery);
        if (!result.estado) return result;

        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ codigoStock, sapDeposito, nombreDeposito, codigoEstiba, nombreEstiba, codigoProducto, truck, sap, nombreProducto, codigoBarra, ean, lotePlanta, loteProducto, fechaFabricacion, fechaVencimiento, cantidadStock, abc, estadoStock }) => ({
            codigoStock,
            sapDeposito,
            nombreDeposito,
            codigoEstiba,
            nombreEstiba,
            codigoProducto,
            truck,
            sap,
            nombreProducto,
            codigoBarra: codigoBarra ? codigoBarra : "",
            ean,
            lotePlanta: lotePlanta ? lotePlanta : "",
            loteProducto: loteProducto ? loteProducto : "",
            fechaFabricacion: fechaFabricacion ? moment(fechaFabricacion).format("YYYY-DD-DD") : "",
            fechaVencimiento: fechaVencimiento ? moment(fechaVencimiento).format("YYYY-DD-DD") : "",
            cantidadStock,
            abc: abc === 1,
            estadoStock: estadoStock === 1
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

export const modelInsertarStock = async (parametros) => {
    const paramsQuery = [
        parametros.codigoEstiba,
        parametros.codigoProducto,
        parametros.codigoBarra,
        parametros.lotePlanta,
        parametros.loteProducto,
        parametros.fechaFabricacion,
        parametros.fechaVencimiento,
        parametros.cantidadStock,
        parametros.codigoUsuario
    ];

    try {
        const result = await insertarProcedure(queryInsertarStock, paramsQuery);
        if (!result.estado) return result;

        const codigoStock = result.data[0]?.codigoStock ?? null;
        return {
            estado: true,
            codigoStock
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarStock = async (parametros) => {
    const paramsQuery = [
        parametros.codigoEstiba,
        parametros.codigoProducto,
        parametros.codigoBarra,
        parametros.lotePlanta,
        parametros.loteProducto,
        parametros.fechaFabricacion,
        parametros.fechaVencimiento,
        parametros.cantidadStock,
        parametros.codigoUsuario,
        parametros.codigoStock
    ];

    try {
        const result = await actualizarProcedure(queryEditarStock, paramsQuery);
        if (!result.estado) return result;

        return {
            estado: result.estado,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelMantenerStock = async (parametros) => {
    const paramsQuery = [
        parametros.estadoStock,
        parametros.codigoUsuario,
        parametros.codigoStock
    ];

    try {
        const result = await actualizarProcedure(queryMantenerStock, paramsQuery);
        if (!result.estado) return result;

        return {
            estado: result.estado,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelUpsert = async (parametros) => {
    const columsQuery = [
        "codigoEstiba",
        "codigoProducto",
        "codigoBarra",
        "lotePlanta",
        "loteProducto",
        "fechaFabricacion",
        "fechaVencimiento",
        "cantidadStock",
        "codigoUsuario"
    ];

    try {
        return await upsertCSV(parametros, columsQuery, queryUpsertStockCSV);
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}