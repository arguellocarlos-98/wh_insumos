import { Router } from "express";
import { editarConversion, insertarConversion, listarConversion, mantenerConversion } from "../controllers/conversiones.controller.js";

const router = Router();

// PETICIONES POST
router.post("/conversiones", insertarConversion);

// PETICIONES PATCH
router.patch("/conversiones/editar", editarConversion);
router.patch("/conversiones/mantener", mantenerConversion);

// PETICIONES GET
router.get("/conversiones/:filtro", listarConversion);

export default router;