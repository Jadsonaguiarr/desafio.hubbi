import type { Request, Response } from "express";
import prismaClient from "../prisma/client";

import config from "../config/config";
import { sign } from "jsonwebtoken";

import { compare } from "bcryptjs";

class Authenticate {
	async login(req: Request, res: Response): Promise<void> {
		const { cpf, password } = req.body;
console.log(req.body)
		const user = await prismaClient.user.findFirst({ where: { cpf: cpf } });

		if (!user) {
			res.status(404).json({ message: "Usuario não encontrado" });
			return;
		}

		const autenticada = await compare(password, user.password);

		if (!autenticada) {
			res.status(400).json({ message: "Senha incorreta!" });
			return;
		}

		const { expiresIn, secret } = config.jwt;
		const token = sign({}, secret, {
			expiresIn: expiresIn,
			algorithm: "HS256",
		});

		res
			.status(200)
			.json({
				user: { name: user.name, id: user.id, admin: user.admin },
				token,
			});
	}
}

export default new Authenticate();
