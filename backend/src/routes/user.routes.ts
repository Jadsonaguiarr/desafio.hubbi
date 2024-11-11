import { Router } from "express";
import UserController from "../controllers/UserController";

const path = "/user";
const router = Router();

router.post(`${path}/`, UserController.create);
router.get(`${path}/:id`, UserController.getById)

export default router;
