import { Router } from "express";
import CompraController from "../controllers/CompraController";

const path = "/comprar";
const router = Router();

router.post(`${path}/`, CompraController.create);
router.get(`${path}/getall`, CompraController.getAll);

export default router;
