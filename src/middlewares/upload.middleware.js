import multer from "multer";
import path from "path";

// Ruta absoluta hacia la carpeta uploads
const uploadsFolder = path.resolve("src/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder); // aca apunta a src/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ej: 1728721.csv
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv" && !file.originalname.endsWith(".csv")) {
      return cb(new Error("Solo se permiten archivos CSV"));
    }
    cb(null, true);
  },
});
