import { modelEditarSubsector, modelInsertarSubsector, modelListarSubsector, modelMantenerSubsector } from "../models/subsectores.model.js";

export const listarSubsector = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarSubsector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarSubsector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarSubsector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarSubsector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelEditarSubsector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerSubsector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelMantenerSubsector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};