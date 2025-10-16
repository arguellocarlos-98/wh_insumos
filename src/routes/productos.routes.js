import { Router } from "express";
import multer from "multer";
import path from "path";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { editarProducto, insertarProducto, listarProducto, mantenerProducto, cargarProductosCSV } from "../controllers/productos.controller.js";

const router = Router();

// Carpeta absoluta dentro de src/uploads
const uploadsFolder = path.resolve("src/uploads/maestro");

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

router.get("/productos/:filtro", authMiddleware, listarProducto);

router.post("/productos", authMiddleware, insertarProducto);
router.post("/productos/upsert", authMiddleware, upload.single("archivo"), cargarProductosCSV);

router.patch("/productos", authMiddleware, editarProducto);
router.patch("/productos/mantener", authMiddleware, mantenerProducto);

export default router;