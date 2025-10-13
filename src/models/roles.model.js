import * as Sentry from "@sentry/node";
import { listarProcedure } from "../db/operations.db.js";
import { queryListarRol } from "../queries/roles.queries.js";

export const modelListarRol = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];
    try {
        const result = await listarProcedure(queryListarRol, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoRol, nombreRol, estadoRol }) => ({
            codigoRol,
            nombreRol,
            estadoRol: estadoRol === 1
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