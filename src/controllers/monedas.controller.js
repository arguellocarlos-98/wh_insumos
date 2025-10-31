import { modelEditarMoneda, modelInsertarMoneda, modelListarMoneda, modelMantenerMoneda } from "../models/monedas.model.js";

export const insertarMoneda = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelInsertarMoneda(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarMoneda = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelEditarMoneda(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerMoneda = async (req, res, next) => {
    const parametros = req.body;

    try {
        const result = await modelMantenerMoneda(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const listarMoneda = async (req, res, next) => {
    const parametros = req.params;

    try {
        const result = await modelListarMoneda(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};