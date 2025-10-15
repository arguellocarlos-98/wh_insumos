import { modelEditarEstiba, modelInsertarEstiba, modelListarEstiba, modelMantenerEstiba } from "../models/estibas.model.js";

export const listarEstiba = async (req, res, next) => {
  const parametros = req.params;
  try {
    const result = await modelListarEstiba(parametros);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const insertarEstiba = async (req, res, next) => {
  const parametros = req.body;
  try {
    const result = await modelInsertarEstiba(parametros);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const editarEstiba = async (req, res, next) => {
  const parametros = req.body;
  try {
    const result = await modelEditarEstiba(parametros);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const mantenerEstiba = async (req, res, next) => {
  const parametros = req.body;
  try {
    const result = await modelMantenerEstiba(parametros);
    res.json(result);
  } catch (error) {
    next(error);
  }
};