import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";

const path = "/produto";
const router = Router();

router.post(`${path}/`, ProdutoController.create);
router.get(`${path}/getall`, ProdutoController.getall)
router.get(`${path}/:id`, ProdutoController.getById)

export default router;
