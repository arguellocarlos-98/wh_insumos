import * as Sentry from "@sentry/node";
import { actualizarProcedure, insertarProcedure, listarProcedure } from "../db/operations.db.js";
import { queryListarSector } from "../queries/sectores.queries.js";

export const modelListarSector = async (params) => {
    const paramsQuery = [
        params.codigoSucursal,
        params.filtro
    ];

    try {
        const result = await listarProcedure(queryListarSector, paramsQuery);

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoSector, nombreSector, estadoSector }) => ({
            codigoSector,
            nombreSector,
            estadoSector: estadoSector === 1
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