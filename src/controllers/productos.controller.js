import { modelEditarProducto, modelInsertarProducto, modelListarProducto, modelMantenerProducto } from "../models/productos.model.js";

export const listarProducto = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarProducto(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarProducto = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarProducto(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarProducto = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarProducto(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerProducto = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerProducto(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};