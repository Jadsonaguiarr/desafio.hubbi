import { toast } from "react-toastify";
import type { produto } from "./produto";

export interface venda {
	id: string;
	createdAt: string;
	status: string;
	total?: number;
	id_comprador: string;
	Produto_Venda: [
		{
			id: string;
			qtd_produto: number;
			status: string;
			id_produto: string;
			id_venda: string;
			produto: produto;
		},
	];
}

export interface dados {
	total: number;
	percentual: number;
}

export async function comprarProduto(data: {
	id_comprador: string;
	produtos: produto[];
}) {
	const verificaQtd = data.produtos.some((prod) => prod.qtd === 0);
	if (verificaQtd) {
		toast.error("Não é possivel comprar 0 unidade");
		return;
	}
	console.log(data.produtos);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/venda/${data.id_comprador}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				produtos: data.produtos,
			}),
		},
	);

	const dataResponse = await response.json();

	if (response.ok) {
		toast.success("Compra realizada com sucesso");
		console.log(dataResponse);
	} else {
		toast.error("Houve uma falha na compra, tente novamente");
		console.log(dataResponse.message);
	}
}

export async function getAll() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/venda/getall`,
		{
			method: "GET",
		},
	);

	const data: venda[] = await response.json();

	console.log(data);

	return data;
}

export async function getAllByUSer(id: string) {
	console.log(`chegou aqui ${id}`);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/venda/getbyuser/${id}`,
		{
			method: "GET",
		},
	);

	const data = await response.json();
	console.log(data);

	return data;
}

export async function vendasMensais() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/venda/total`,
		{
			method: "GET",
		},
	);

	const data: dados = await response.json();

	return data;
}
