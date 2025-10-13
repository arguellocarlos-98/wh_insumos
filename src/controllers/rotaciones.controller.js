import { modelEditarRotacion, modelInsertarRotacion, modelListarRotacion, modelMantenerRotacion } from "../models/rotaciones.model.js";

export const listarRotacion = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarRotacion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarRotacion = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarRotacion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarRotacion = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarRotacion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerRotacion = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerRotacion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};