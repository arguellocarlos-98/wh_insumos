import { modelEditarZonaDeposito, modelInsertarZonaDeposito, modelListarZonaDeposito, modelMantenerZonaDeposito } from "../models/zonas_depositos.model.js";

export const listarZonaDeposito = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarZonaDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarZonaDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarZonaDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarZonaDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarZonaDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerZonaDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerZonaDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};