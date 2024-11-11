"use client";

import { toast } from "react-toastify";
export interface produto {
	nome: string;
	preco: number;
	id?: string;
	qtd: 0;
}

export interface compraProduto {
	id_venda: string;
	produtos: Produto_Venda[];
}

export interface Produto_Venda {
	id: string;
	qtd_produto?: number;
	status?: string;
	id_produto?: string;
	id_venda?: string;
	produto?: produto;
}

interface Produto {
	id: string;
	nome?: string; // Opcional, pois não foi fornecido no exemplo
	// Adicione outras propriedades do produto, se necessário
}

interface CompraProduto {
	id: string;
	qtd_produto: number;
	id_produto: string;
	id_compra: string;
	produto: Produto;
}

export interface Compra {
	id: string;
	id_venda: string;
	createdAt: string;
	Compra_Produto: CompraProduto[];
}

export async function create(data: compraProduto) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comprar`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id_venda: data.id_venda,
			produtos: data.produtos,
		}),
	});

	const dataResponse: { message: string } = await response.json();

	if (response.ok) {
		toast.success(dataResponse.message);
		
	} else {
		toast.error(dataResponse.message);
	}

	setTimeout(() => {
		document.location.reload();
	}, 1800);
}

export async function getAll() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/comprar/getall`,
		{
			method: "GET",
		},
	);

	const data: Compra[] = await response.json();

	console.log(data);

	return data;
}
