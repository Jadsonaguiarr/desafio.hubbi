import { toast } from "react-toastify";

export interface user {
	nome: string;
	cpf: string;
	password: string;
	id?: string;
	admin: boolean;
}

export async function create(user: user) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: user.nome,
			cpf: user.cpf,
			password: user.password,
			admin: user.admin
		}),
	});

	const data = await response.json();
	if (response.ok) {
		toast.success(
			`Seja bem vindo ${data.name}, faça login com suas credencias`,
		);
	} else {
		toast.error("Erro ao criar usuarion");
	}
}
