import type { Request, Response } from "express";
import prismaClient from "../prisma/client";

import { z } from "zod";
import bcrypt from "bcryptjs";

class UserController {
	async create(req: Request, res: Response): Promise<void> {
		const data = req.body;
		try {
			const schema = z.object({
				cpf: z.string({
					required_error: "Adicione o cpf!",
				}),
				name: z.string({
					required_error: "Adicione o nome!",
				}),
				admin: z.coerce.boolean(),
				password: z.string({
					required_error: "Adicione uma senha!",
				}),
			});

			schema.parse(data);

			const hashPassword = await bcrypt.hash(data.password, 10);

			const user = await prismaClient.user.create({
				data: {
					cpf: data.cpf,
					name: data.name,
					admin: data.admin,
					password: hashPassword,
				},
			});
			res.status(201).json(user);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				res.json({
					message: error.errors.map((e) => e.message),
					code: 400,
					typeError: "Dados inconsistentes",
				});
			}
			res.json({
				message: error.message,
				code: 500,
				typeError: "Erro interno no servidor",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;

			const user = await prismaClient.user.findFirst({ where: { id: id } });

			if (!user) {
				res.json({
					message: "Usuario não encontrado!",
				});
			}

			res.json(user);
		} catch (error) {
			res.status(500).json({ message: "Erro interno no servidor" });
		}
	}
}

export default new UserController();
