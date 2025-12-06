import { Router } from "express";
import { verificarVersionApp } from "../controllers/versions.controller.js";

const router = Router();

// PETICIONES GET
router.get("/version", verificarVersionApp);

export default router;