import { modelCantidadStockDeposito } from "../models/graficos.model.js";

export const cantidadStockDeposito = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelCantidadStockDeposito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};