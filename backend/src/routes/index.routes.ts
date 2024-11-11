import express from "express";

import produtoRoutes from "./produto.routes";
import userRoutes from "./user.routes";
import vendaRoutes from './venda.routes'
import comprarRoutes from './compra.routes'
import authenticateRoutes from './authenticate.routes'

const app_router = express();

app_router.use(produtoRoutes);
app_router.use(userRoutes);
app_router.use(vendaRoutes)
app_router.use(comprarRoutes)
app_router.use(authenticateRoutes)

export default app_router;
