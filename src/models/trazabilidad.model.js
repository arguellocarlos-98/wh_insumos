import * as Sentry from "@sentry/node";
import { listarProcedure, mostrarProcedure } from "../db/operations.db.js";

import { trazabilidadQueries } from "../queries/trazabilidad.queries.js";
import { parsearEstibas } from "../functions/parsearEstibas.function.js";
import moment from "moment";

export const modelReporteTrazabilidadResumen = async (parametros) => {
    const paramsQuery = [parametros.codigoProducto];

    try {
        const result = await mostrarProcedure(trazabilidadQueries.sp_reporteTrazabilidadResumen, paramsQuery);
        const found = result.found;
        const row = result.data;

        const data = found ? (({ SAP, Material, Stock, UM, Ubicaciones, Valorizacion, Entrada, Salida, Estibas }) => ({
            SAP,
            Material,
            Stock: parseFloat(Stock),
            UM,
            Ubicaciones: parseInt(Ubicaciones),
            Valorizacion: parseFloat(Valorizacion),
            Entrada: parseInt(Entrada),
            Salida: parseInt(Salida),
            Estibas: parsearEstibas(Estibas),
        }))(row) : {};

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

export const modelReporteTrazabilidadEntrada = async (parametros) => {
    const paramsQuery = [parametros.codigoProducto];

    try {
        const result = await listarProcedure(trazabilidadQueries.sp_reporteTrazabilidadEntrada, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ tipoRemito, numeroRemito, Origen, Cantidad, fechaRemito }) => ({
            tipoRemito,
            numeroRemito,
            Origen,
            Cantidad: parseFloat(Cantidad),
            Fecha: moment(fechaRemito).format("DD-MM-YYYY"),
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

export const modelReporteTrazabilidadSalida = async (parametros) => {
    const paramsQuery = [parametros.codigoProducto];

    try {
        const result = await listarProcedure(trazabilidadQueries.sp_reporteTrazabilidadSalida, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ tipoRemito, numeroRemito, Origen, Cantidad, fechaRemito }) => ({
            tipoRemito,
            numeroRemito,
            Origen,
            Cantidad: parseFloat(Cantidad),
            Fecha: moment(fechaRemito).format("DD-MM-YYYY"),
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

export const modelReporteTrazabilidadSectorial = async (parametros) => {
    const paramsQuery = [parametros.codigoProducto];

    try {
        const result = await listarProcedure(trazabilidadQueries.sp_reporteTrazabilidadSectorial, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ tipoRemito, numeroRemito, Origen, Cantidad, fechaRemito }) => ({
            tipoRemito,
            numeroRemito,
            Origen,
            Cantidad: parseFloat(Cantidad),
            Fecha: moment(fechaRemito).format("DD-MM-YYYY"),
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

export const modelReporteTrazabilidadCronologico = async (parametros) => {
    const paramsQuery = [parametros.codigoProducto];

    try {
        const result = await listarProcedure(trazabilidadQueries.sp_reporteTrazabilidadCronologico, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ tipoRemito, numeroRemito, Destino, Cantidad, fechaRemito }) => ({
            tipoRemito,
            numeroRemito,
            Destino,
            Cantidad: parseFloat(Cantidad),
            Fecha: moment(fechaRemito).format("DD-MM-YYYY"),
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