import * as Sentry from "@sentry/node";
import { queryVerificarVersionApp } from "../queries/versions.queries.js";
import { mostrarProcedure } from "../db/operations.db.js";

export const modelVerificarVersionApp = async () => {
    try {
        const result = await mostrarProcedure(queryVerificarVersionApp);
        const rows = result.data;
        const found = result.found;

        return {
            estado: true,
            found,
            version: rows.numberVersion
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};