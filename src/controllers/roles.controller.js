import { modelEditarRol, modelInsertarRol, modelListarRol, modelMantenerRol } from "../models/roles.model.js";

export const listarRol = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarRol(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarRol = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarRol(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarRol = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarRol(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerRol = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerRol(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};