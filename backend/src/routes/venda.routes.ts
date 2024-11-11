import { Router } from "express";
import VendaControler from "../controllers/VendaControler";

const path = "/venda";
const router = Router();

router.get(`${path}/total`, VendaControler.totalDeVendas)
router.get(`${path}/getall`, VendaControler.getAll)
router.get(`${path}/:id`, VendaControler.getById)
router.get(`${path}/getbyuser/:id`, VendaControler.getAllByIdUser)
router.post(`${path}/:id`, VendaControler.create);

export default router;
