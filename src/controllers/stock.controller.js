import { modelEditarStock, modelInsertarStock, modelListarStock, modelMantenerStock } from "../models/stock.model.js";

export const listarStock = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarStock(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarStock = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarStock(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarStock = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelEditarStock(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerStock = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelMantenerStock(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};