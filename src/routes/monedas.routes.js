import { Router } from "express";
import { editarMoneda, insertarMoneda, listarMoneda, mantenerMoneda } from "../controllers/monedas.controller.js";

const router = Router();

// PETICIONES POST
router.post("/moneda", insertarMoneda);

// PETICIONES PATCH
router.patch("/moneda/editar", editarMoneda);
router.patch("/moneda/mantener", mantenerMoneda);

// PETICIONES GET
router.get("/moneda/:filtro", listarMoneda);

export default router;