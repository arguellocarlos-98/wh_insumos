import { modelEditarSector, modelInsertarSector, modelListarSector, modelMantenerSector } from "../models/sectores.model.js";

export const listarSector = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarSector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarSector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarSector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarSector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelEditarSector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerSector = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelMantenerSector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};