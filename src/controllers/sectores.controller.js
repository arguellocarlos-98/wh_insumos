import { modelListarSector } from "../models/sectores.model.js";

export const listarSector = async (req, res, next) => {
    try {
        const parametros = req.params;
        const result = await modelListarSector(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
}