import { modelVerificarVersionApp } from "../models/versions.model.js";

export const verificarVersionApp = async (req,res,next) => {
    try {
        const result = await modelVerificarVersionApp();
        res.json(result);
    } catch (error) {
        next(error);
    }  
};