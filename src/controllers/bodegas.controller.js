import { modelEditarBodega, modelInsertarBodega, modelListarBodega, modelMantenerBodega } from "../models/bodegas.model.js";

export const listarBodega = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarBodega(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarBodega = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarBodega(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarBodega = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarBodega(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerBodega = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerBodega(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};