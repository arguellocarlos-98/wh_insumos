import { modelBuscarRemitoPreparado, modelBuscarRemitoRecibido, modelCancelarRemito, modelConfirmarRemito, modelInsertarRemito, modelInsertarRemitoCheck, modelInsertarRemitoPanel, modelMostrarRemitoDetallexCod, modelRecibirRemito } from "../models/remito.model.js";

export const insertarRemito = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const buscarRemitoPreparado = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelBuscarRemitoPreparado(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mostrarRemitoDetallexCod = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelMostrarRemitoDetallexCod(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const entregarRemito = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelConfirmarRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const buscarRemitoRecibido = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelBuscarRemitoRecibido(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const recibirRemito = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelRecibirRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarRemitoPanel = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarRemitoPanel(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const insertarRemitoCheck = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarRemitoCheck(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const cancelarRemito = async (req,res,next) => {
    try {
        const parametros = req.body;
        const result = await modelCancelarRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    } 
};