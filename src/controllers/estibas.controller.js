import path from "path";
import fs from "fs/promises";

import { modelEditarEstiba, modelInsertarEstiba, modelInsertarEstibaCSV, modelListarEstiba, modelMantenerEstiba } from "../models/estibas.model.js";

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

export const insertarEstibaCSV = async (req, res, next) => {
  const rutaCSV = path.resolve("src/uploads/estibas", req.file.filename);
  try {
    const resultado = await modelInsertarEstibaCSV(rutaCSV);
    res.json({
      estado: true,
      mensaje: "Estibas cargadas correctamente",
      ...resultado,
    });
  } catch (error) {
    next(error)
  } finally {
    await fs.unlink(rutaCSV).catch(() => { });
  }
};