import * as Sentry from "@sentry/node";
import { listarProcedure, insertarProcedure, actualizarProcedure, upsertCSV } from "../db/operations.db.js";
import { queryBuscarStockDescripcionLote, queryDeshabilitarStockPorSucursal, queryEditarStock, queryInsertarStock, queryListarStock, queryListarStockProximoVencer, queryMantenerStock, queryUpsertStockCSV } from "../queries/stock.queries.js";
import moment from "moment";
import { capturaError } from "../helpers/capturaError.helper.js";

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
            fechaFabricacion: fechaFabricacion ? moment(fechaFabricacion).format("YYYY-MM-DD") : "",
            fechaVencimiento: fechaVencimiento ? moment(fechaVencimiento).format("YYYY-MM-DD") : "",
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

export const modelUpsertStockCSV = async (parametros) => {
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
        return await upsertCSV(parametros, columsQuery, queryUpsertStockCSV, queryDeshabilitarStockPorSucursal);
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelBuscarStockDescripcionLote = async (params) => {
    const paramsQuery = [
        params.codigoSucursal,
        params.filtro,
        params.campo
    ];

    try {
        const result = await listarProcedure(queryBuscarStockDescripcionLote, paramsQuery);

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoStock, nombreEstiba, nombreZona, nombreBodega, nombreDeposito, sap, nombreProducto, cantidadStock, unidadMedida, lotePlanta, loteProducto, fechaFabricacion, fechaVencimiento }) => ({
            codigoStock,
            nombreEstiba,
            nombreZona,
            nombreBodega,
            nombreDeposito,
            sap,
            nombreProducto,
            cantidadStock,
            unidadMedida,
            lotePlanta,
            loteProducto,
            fechaFabricacion: moment(fechaFabricacion).format("YYYY-MM-DD"),
            fechaVencimiento: moment(fechaVencimiento).format("YYYY-MM-DD"),
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

export const modelListarStockProximoVencer = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.cantidadDia
    ];

    try {
        const result = await listarProcedure(queryListarStockProximoVencer, paramsQuery);
        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoStock, Deposito, Bodega, Zona, Estiba, SAP, Material, Fabricacion, Vencimiento, diaVencimiento, Cantidad }) => ({
            codigoStock,
            Deposito,
            Bodega,
            Zona,
            Estiba,
            SAP,
            Material,
            Fabricacion,
            Vencimiento,
            diaVencimiento: parseInt(diaVencimiento),
            Cantidad: parseInt(Cantidad)
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