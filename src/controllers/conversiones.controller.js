import { modelEditarConversion, modelInsertarConversion, modelListarConversion, modelMantenerConversion } from "../models/conversiones.model.js";

export const insertarConversion = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelInsertarConversion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarConversion = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelEditarConversion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerConversion = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelMantenerConversion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const listarConversion = async (req, res, next) => {
    const parametros = req.params;

    try {
        const result = await modelListarConversion(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};