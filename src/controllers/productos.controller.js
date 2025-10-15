import path from "path";
import fs from "fs/promises";

import { modelEditarProducto, modelInsertarProducto, modelListarProducto, modelMantenerProducto, upsertProductosDesdeCSV } from "../models/productos.model.js";

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

export const cargarProductosCSV = async (req, res, next) => {
    const rutaCSV = path.resolve("src/uploads/maestro", req.file.filename);
    try {
        const resultado = await upsertProductosDesdeCSV(rutaCSV);
        res.json({
            estado: true,
            mensaje: "Productos cargados correctamente",
            ...resultado,
        });
    } catch (error) {
        if (error instanceof DatabaseError) {
            return res.status(400).json({
                estado: false,
                mensaje: error.message,
            });
        };
        next(error);
    } finally {
        await fs.unlink(rutaCSV).catch(() => { });
    }
};