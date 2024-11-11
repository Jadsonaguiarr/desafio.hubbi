import { Router } from "express";
import Authenticate from "../controllers/Authenticate";

const path = "/auth";
const router = Router();

router.post(`${path}/`, Authenticate.login)

export default router