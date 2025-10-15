import { modelEditarCategoria, modelInsertarCategoria, modelListarCategoria, modelMantenerCategoria } from "../models/productos_categorias.model.js";

export const listarCategoria = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarCategoria(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarCategoria = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarCategoria(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarCategoria = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarCategoria(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerCategoria = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerCategoria(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};