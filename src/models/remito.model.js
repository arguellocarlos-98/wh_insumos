import * as Sentry from "@sentry/node";
import {
    queryInsertarRemito,
    queryInsertarRemitoDetalle,
    queryInsertarRemitoIndicador
} from "../queries/remitos.queries.js";

import { insertarProcedure } from "../db/operations.db.js";

// ------------------------------------------
// Función para insertar encabezado
// ------------------------------------------
const insertarEncabezado = async (params) => {
    const p = [
        params.tipoRemito,
        params.numeroPedido,
        params.observacionRemito,
        params.preparacionCarga,
        params.codigoUsuario
    ];

    return insertarProcedure(queryInsertarRemito, p);
};

// ------------------------------------------
// Función para insertar un detalle
// ------------------------------------------
const insertarDetalle = async (codigoRemito, det) => {
    const p = [
        codigoRemito,
        det.codigoStock,
        det.documentoSap,
        det.cantidadSolicitada,
        det.cantidadEnviada
    ];

    return insertarProcedure(queryInsertarRemitoDetalle, p);
};

// ------------------------------------------
// Función para insertar indicadores
// ------------------------------------------
const insertarIndicador = async (codigoRemito, det) => {
    const p = [
        codigoRemito,
        det.codigoIndicador,
        det.checkRemitoIndicador
    ];

    return insertarProcedure(queryInsertarRemitoIndicador, p);
};

// ------------------------------------------
// Modelo principal
// ------------------------------------------
export const modelInsertarRemito = async (params) => {
    try {
        // 1) Insertar encabezado
        const encabezado = await insertarEncabezado(params);
        if (!encabezado.estado) return encabezado;

        const codigoRemito = encabezado.data[0]?.codigoRemito;
        if (!codigoRemito) throw new Error("No se obtuvo codigoRemito");

        // 2) Insertar detalles (si existen)
        if (Array.isArray(params.detalle) && params.detalle.length > 0) {
            for (const det of params.detalle) {
                const resultDet = await insertarDetalle(codigoRemito, det);
                if (!resultDet.estado) return resultDet;
            }
        };

        // 2) Insertar detalles (si existen)
        if (Array.isArray(params.indicadores) && params.indicadores.length > 0) {
            for (const indicador of params.indicadores) {
                const resultIndicador = await insertarIndicador(codigoRemito, indicador);
                if (!resultIndicador.estado) return resultIndicador;
            }
        };

        // 4) Respuesta final
        return {
            estado: true,
            codigoRemito
        };

    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};
