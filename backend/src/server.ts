import express from "express";
import bodyParser from "body-parser";

import cors from 'cors'

import app_router from "./routes/index.routes";

const app = express();
const port = 4000;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.json());
app.use(bodyParser.json());
app.use(app_router);

app.listen(port, () => {
	console.log(`Desafio hubbi rodando na porta: ${port}`);
});
