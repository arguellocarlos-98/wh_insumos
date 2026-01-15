import { modelDashboardProductos, modelDashboardRemito, modelDashboardUltimosRemitos, modelDashboardVencimientoProximo } from "../models/dashboard.model.js";

export const dashboardProductos = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelDashboardProductos(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const dashboardRemito = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelDashboardRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const dashboardUltimosRemitos = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelDashboardUltimosRemitos(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const dashboardVencimientoProximo = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelDashboardVencimientoProximo(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};