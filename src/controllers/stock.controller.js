import path from "path";
import fs from "fs/promises";

import { modelBuscarStockDescripcionLote, modelEditarStock, modelInsertarStock, modelListarStock, modelListarStockProximoVencer, modelMantenerStock, modelUpsertStockCSV } from "../models/stock.model.js";

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

export const upsertStockCSV = async (req, res, next) => {
    const rutaCSV = path.resolve("src/uploads/stock", req.file.filename);
    try {
        const resultado = await modelUpsertStockCSV(rutaCSV);
        res.json({
            estado: true,
            mensaje: "Stock cargado correctamente",
            ...resultado,
        });
    } catch (error) {
        next(error);
    } finally {
        await fs.unlink(rutaCSV).catch(() => { });
    }
};

export const buscarStockDescripcionLote = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelBuscarStockDescripcionLote(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const listarStockProximoVencer = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarStockProximoVencer(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};