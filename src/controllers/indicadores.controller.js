import { modelEditarIndicador, modelInsertarIndicador, modelListarIndicador, modelMantenerIndicador } from "../models/indicadores.model.js";

export const listarIndicador = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarIndicador(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarIndicador = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarIndicador(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarIndicador = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelEditarIndicador(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerIndicador = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelMantenerIndicador(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};