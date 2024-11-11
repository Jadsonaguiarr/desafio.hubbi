import type { Request, Response } from "express";

import { z } from "zod";
import prismaClient from "../prisma/client";
import ProdutoController from "./ProdutoController";

interface produto {
	id_venda: string;
	id: string;
	qtd: number;
	nome: string,
	preco: number
}

// produtos: [
//     {
//       id: '97056d0c-ee70-4061-a30c-18076b00ea99',
//       nome: 'parafuso',
//       preco: 0.5,
//       qtd: 1
//     }
//   ]

class VendaController {
	async create(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const id = req.params.id;

			console.log('data: ', data)
			// console.log('id: ', id)

			const schema = z.object({
				produtos: z.array(
					z.object({
						id: z.string(),
						qtd: z.number(),
						preco: z.number(),
					}),
					{
						required_error: "Adicione itens na compra!",
					},
				),
			});
			


			let total = 0;

			data.produtos.map((prod: produto) => {
				total += prod.preco * prod.qtd;
			});

			// console.log('total: ', total)

			schema.parse(data);

			const produtos = data.produtos;

			const venda = await prismaClient.venda.create({
				data: {
					id_comprador: id,
					status: "Em preparo",
					total: total,
				},
			});

			produtos.map(async (produto: produto) => {
				const produto_venda = await prismaClient.produto_Venda.create({
					data: {
						qtd_produto: produto.qtd,
						id_produto: produto.id,
						id_venda: venda.id,
					},
				});

				return produto_venda;
			});

			res.json({ venda, produtos });
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					message: error.errors.map((e) => e.message),
					typeError: "Dados inconsistentes",
				});
			}
			console.log(error);
			res.status(500).json({
				message: error.message,
				typeError: "Erro interno no servidor",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;

			const venda = await prismaClient.venda.findFirst({
				where: { id: id },
				include: {
					Produto_Venda: {
						include: {
							produto: true, // Inclui todos os detalhes do produto associado
						},
					},
				},
			});

			if (!venda) {
				res.status(404).json({ message: "Usuario nao encontrado!" });
			}

			res.json(venda);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			res.status(500).json({
				message: "Erro interno no servidor",
			});
		}
	}

	async verificaVenda(id: string) {
		const venda = await prismaClient.venda.findFirst({ where: { id: id } });

		if (!venda) return;

		const produtosVenda = await prismaClient.produto_Venda.findMany({
			where: { id_venda: venda.id },
		});

		if (!produtosVenda) return;

		const produtosVerificados = produtosVenda.every(
			(produto) => produto.status === "Comprado",
		);
		console.log(produtosVerificados);
		if (produtosVerificados) {
			const venda = await prismaClient.venda.update({
				where: { id: id },
				data: {
					status: "Finalizado",
				},
				include: {
					Produto_Venda: {
						include: {
							produto: true,
						},
					},
				},
			});
			return venda;
		}
		return;
	}

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const vendas = await prismaClient.venda.findMany({
				include: { Produto_Venda: { include: { produto: true } } },
			});

			res.status(200).json(vendas);
		} catch (error) {
			res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
		}
	}

	async getAllByIdUser(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;

			const vendas = await prismaClient.venda.findMany({
				where: { id_comprador: id },
				include: {
					Produto_Venda: {
						include: {
							produto: true,
						},
					},
				},
			});
			console.log(typeof vendas[0].createdAt, vendas);

			res.status(200).json(vendas);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Aconteceu um erro interno no servidor" });
		}
	}

	async totalDeVendas(req: Request, res: Response): Promise<void> {
		const data = new Date();

		const ano = data.getFullYear();
		const mes = data.getMonth();

		const inicioMesAtual = new Date(ano, mes, 1);
		const fimMesAtual = new Date(ano, mes + 1, 1);

		const inicioMesAnterior = new Date(ano, mes - 1, 1);
		const fimMesAnterior = new Date(ano, mes, 1);

		const vendasMesAtual = await prismaClient.venda.count({
			where: {
				createdAt: {
					gte: inicioMesAtual,
					lt: fimMesAtual,
				},
			},
		});

		const vendasMesAnterior = await prismaClient.venda.count({
			where: {
				createdAt: {
					gte: inicioMesAnterior,
					lt: fimMesAnterior,
				},
			},
		});

		let percentual = 0;
		if (vendasMesAnterior > 0) {
			percentual = (vendasMesAtual - vendasMesAnterior) * 100;
		}

		res.status(200).json({ total: vendasMesAtual, percentual: percentual });
	}
}

export default new VendaController();
