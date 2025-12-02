import { modelInsertarRemito } from "../models/remito.model.js";

export const insertarRemito = async (req, res, next) => {
    try {
        const parametros = req.body;
        const result = await modelInsertarRemito(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};