import { Router } from "express";
import multer from "multer";
import path from "path";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { listarEstiba, insertarEstiba, editarEstiba, mantenerEstiba, insertarEstibaCSV } from "../controllers/estibas.controller.js";

const router = Router();

// Carpeta absoluta dentro de src/uploads
const uploadsFolder = path.resolve("src/uploads/estibas");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsFolder),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "text/csv" && !file.originalname.endsWith(".csv")) {
            return cb(new Error("Solo se permiten archivos CSV."));
        }
        cb(null, true);
    },
});

router.get("/estibas/:codigoSucursal/:filtro", authMiddleware, listarEstiba);

router.post("/estibas", authMiddleware, insertarEstiba);
router.post("/estibas/csv", authMiddleware, upload.single("archivo"), insertarEstibaCSV);

router.patch("/estibas", authMiddleware, editarEstiba);
router.patch("/estibas/mantener", authMiddleware, mantenerEstiba);

export default router;
