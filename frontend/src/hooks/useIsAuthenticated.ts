"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface userAuthenticated {
	nome: string | null;
	id: string | null;
	token: string | null;
	admin: boolean | null;
}

function useIsAuthenticated(): userAuthenticated | null{
	const [user, setUser] = useState<userAuthenticated | null>(null);

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("token");
			const admin = localStorage.getItem("admin");
			const nome = localStorage.getItem("name");
			const id = localStorage.getItem("id");

			if (!token || !admin) {
				router.push("/");
			} else {
				setUser({
					nome: nome,
					id: id,
					token: token,
					admin: admin === "true",
				});
			}
		}
	}, [router]);

	return user
}

export default useIsAuthenticated;
