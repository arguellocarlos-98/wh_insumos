import multer from "multer";
import path from "path";
import fs from "fs/promises";

import { 
  modelCargaEstibaCSV, 
  modelEditarEstiba, 
  modelInsertarEstiba, 
  modelListarEstiba, 
  modelMantenerEstiba 
} from "../models/estibas.model.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadCSV = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 5MB máximo
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv" && !file.originalname.endsWith(".csv")) {
      return cb(new Error("Solo se permiten archivos CSV"));
    }
    cb(null, true);
  }
});

// --- Controladores existentes ---
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

export const cargarEstibasCSV = async (req, res, next) => {
  try {
    const archivo = req.file;
    if (!archivo) {
      return res.status(400).json({ estado: false, mensaje: "No se envió ningún archivo CSV." });
    }

    const rutaCSV = path.resolve(archivo.path);

    const contenido = await fs.readFile(rutaCSV, "utf8");
    const lineas = contenido.split("\n").filter(Boolean);
    if (lineas.length === 0) throw new Error("El CSV está vacío.");

    const columnasEsperadas = ["sku", "producto"];
    const columnasCSV = lineas[0].split(";").map(c => c.trim().toLowerCase());

    const columnasIncorrectas = columnasEsperadas.filter(c => !columnasCSV.includes(c));
    if (columnasIncorrectas.length > 0) {
      throw new Error(`Columnas faltantes o incorrectas: ${columnasIncorrectas.join(", ")}`);
    }

    const resultado = await modelCargaEstibaCSV(rutaCSV);

    res.json({
      estado: true,
      mensaje: `Archivo ${archivo.originalname} procesado correctamente.`,
      ...resultado,
    });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(path.resolve(req.file.path)).catch(() => {});
    }
  }
};