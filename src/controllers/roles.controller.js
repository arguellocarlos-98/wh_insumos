import { modelListarRol } from "../models/roles.model.js";

export const listarRol = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarRol(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};