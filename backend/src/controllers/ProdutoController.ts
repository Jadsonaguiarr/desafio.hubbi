import type { Request, Response } from "express";
import prismaClient from "../prisma/client";
import { z } from "zod";

interface Produto {
	id: string;
	nome: string;
	preco: number;
}

interface ProdutoVenda {
	id: string;
	qtd_produto: number;
	id_produto: string;
	id_venda: string;
	produto: Produto;
}

class ProdutoController {
	async create(req: Request, res: Response): Promise<void> {
		const data = req.body;
		try {
			const schema = z.object({
				nome: z.string({
					required_error: "Adicione o nome do produto!",
				}),
				preco: z.number({
					required_error: "Adicione o preço do produto!",
				}),
			});
			const validateName = await prismaClient.produto.findUnique({
				where: { nome: data.nome },
			});
			if (validateName) {
				res.status(400).json({ message: "produto ja adicionado!" });
				return;
			}

			schema.parse(data);

			await prismaClient.produto.create({
				data: {
					nome: data.nome,
					preco: data.preco,
				},
			});
			res.status(201).json({ message: "Produto adicionado com sucesso!" });
			return;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					message: error.errors.map((e) => e.message),
				});
				return;
			}
			res.status(500).json({
				message: error.message,
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			const produto = await prismaClient.produto.findFirst({
				where: { id: id },
			});

			if (!produto) {
				res.status(404).json({
					message: "Produto não encontrado!",
				});
			}

			res.status(200).json(produto);
		} catch (error) {
			res.status(500).json({
				message: "Erro interno no servidor",
			});
		}
	}

	async getall(req: Request, res: Response): Promise<void> {
		try {
			const produtos = await prismaClient.produto.findMany();
			res.status(200).json(produtos);
		} catch (error) {
			res.status(500).json({message: 'Aconteceu um erro interno no servidor!'})
		}
	}
}

export default new ProdutoController();
