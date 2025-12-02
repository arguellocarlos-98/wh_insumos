import { Router } from "express";
import multer from "multer";
import path from "path";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { buscarStockDescripcionLote, editarStock, insertarStock, listarStock, mantenerStock, upsertStockCSV } from "../controllers/stock.controller.js";

const router = Router();

// Carpeta absoluta dentro de src/uploads
const uploadsFolder = path.resolve("src/uploads/stock");

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

router.get("/stock/buscar/:codigoSucursal/:filtro/:campo", authMiddleware,buscarStockDescripcionLote);
router.get("/stock/:codigoSucursal/:filtro", authMiddleware, listarStock);

router.post("/stock", authMiddleware, insertarStock);
router.post("/stock/csv", authMiddleware, upload.single("archivo"), upsertStockCSV);

router.patch("/stock", authMiddleware, editarStock);
router.patch("/stock/mantener", authMiddleware, mantenerStock);

export default router;