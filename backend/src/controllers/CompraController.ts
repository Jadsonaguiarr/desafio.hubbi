import type { Request, Response } from "express";
import prismaClient from "../prisma/client";
import { z } from "zod";
import VendaControler from "./VendaControler";

interface produto {
	id_venda: string;
	id_produto: string;
	id: string;
	qtd_produto: number;
}

class CompraController {
	async create(req: Request, res: Response): Promise<void> {
		const data = req.body;
		try {
			const schema = z.object({
				id_venda: z.string({
					required_error: "Erro ao escolher venda",
				}),
				produtos: z.array(
					z.object({
						id: z.string(),
						id_produto: z.string(),
					}),
					{
						required_error: "Adicione itens na compra!",
					},
				),
			});

			await schema.parse(data);

			const venda = await prismaClient.venda.findFirst({
				where: { id: data.id_venda },
			});

			if (!venda) {
				res.status(400).json({ message: "Venda não encontrada!" });
			}

			const compra = await prismaClient.compra.create({
				data: {
					id_venda: data.id_venda,
				},
			});

			const produtos: produto[] = data.produtos;

			const produtos_venda = produtos.map(async (produto) => {
				const produtoAlterado = await prismaClient.produto_Venda.update({
					where: { id: produto.id },
					data: {
						status: "Comprado",
					},
				});
				await prismaClient.compra_Produto.create({
					data: {
						qtd_produto: produtoAlterado.qtd_produto,
						id_compra: compra.id,
						id_produto: produtoAlterado.id_produto,
					},
				});
			});

			const response = await VendaControler.verificaVenda(data.id_venda);
			res.status(200).json({ message: "Compra realizada", compra });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					message: error.errors.map((e) => e.message),
				});
			}
			res.status(500).json({
				message: error.message,
			});
		}
	}

	async getAll(req: Request, res: Response): Promise<void> {
		const compras = await prismaClient.compra.findMany({
			include: { Compra_Produto: { include: { produto: true } } },
		});

		res.status(200).json(compras);
	}
}

export default new CompraController();
