import * as Sentry from "@sentry/node";
import { listarProcedure } from "../db/operations.db.js";
import { queryCantidadStockDeposito } from "../queries/graficos.queries.js";

export const modelCantidadStockDeposito = async (parametros) => {
    const paramsQuery = [parametros.codigoSucursal];
    try {
        const result = await listarProcedure(queryCantidadStockDeposito, paramsQuery);
        const found = result.found;
        const rows = result.data;

        const data = found ? rows.map(({ codigoDeposito, nombreDeposito, Cantidad }) => ({
            codigoDeposito,
            nombreDeposito,
            Cantidad: parseInt(Cantidad)
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
}