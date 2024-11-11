import { toast } from "react-toastify";

export interface produto {
	nome: string;
	preco: number;
	id?: string;
	qtd: 0
}

export async function create({ nome, preco }: Partial<produto>) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produto`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nome: nome,
			preco: Number(preco),
		}),
	});

	const data: { message: string } = await response.json();

	if (response.ok) {
		toast.success(data.message);
	} else {
		toast.error(data.message);
	}
}

export async function getAll() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/produto/getall`,
		{
			method: "GET",
		},
	);

	const data: produto[] = await response.json();

	return data;
}
