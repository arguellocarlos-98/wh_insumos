import { modelEditarDeposito, modelInsertarDeposito, modelListarDeposito, modelMantenerDeposito } from "../models/depositos.model.js";

export const insertarDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const listarDeposito = async(req,res,next) => {
    const parametros = req.params;
    try {
        const result = await modelListarDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerDeposito = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};