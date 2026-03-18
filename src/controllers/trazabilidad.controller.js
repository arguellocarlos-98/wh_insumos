import * as trazabilidadModels from "../models/trazabilidad.model.js";

export const reporteTrazabilidadResumen = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await trazabilidadModels.modelReporteTrazabilidadResumen(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const reporteTrazabilidadEntrada = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await trazabilidadModels.modelReporteTrazabilidadEntrada(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const reporteTrazabilidadSalida = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await trazabilidadModels.modelReporteTrazabilidadSalida(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const reporteTrazabilidadSectorial = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await trazabilidadModels.modelReporteTrazabilidadSectorial(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const reporteTrazabilidadCronologico = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await trazabilidadModels.modelReporteTrazabilidadCronologico(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};