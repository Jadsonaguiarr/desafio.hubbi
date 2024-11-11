"use client";

import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  id: string;
  admin: boolean;
}

interface loginType {
  cpf: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: loginType) => Promise<void>;
  logout: () => void;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Novo estado para controle de carregamento
  const isAuthenticated = !!user;

  const router = useRouter();

  // UseEffect otimizado para carregar o usuário do cookie
  useEffect(() => {
    const { "hubbi.token": token, "hubbi.user.id": id } = parseCookies();

    if (token && id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/user/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Falha ao carregar os dados do usuário");
          }

          const data: User = await response.json();
          setUser(data);
        } catch (error) {
          console.log(error);
          toast.error("Erro ao carregar o usuário");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  async function login({ cpf, password }: loginType) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Erro ao fazer login");
        return;
      }

      const data: LoginResponse = await response.json();

      setCookie(undefined, "hubbi.token", data.token, {
        maxAge: 60 * 60 * 1, // 1 hora
      });
      setCookie(undefined, "hubbi.user.id", data.user.id, {
        maxAge: 60 * 60 * 1,
      });

      setUser({
        admin: data.user.admin,
        id: data.user.id,
        name: data.user.name,
      });

      router.push("/");
    } catch (error) {
      console.log("Erro ao fazer login: ", error);
      toast.error("Erro ao fazer login, tente novamente!");
    }
  }

  function logout() {
    destroyCookie(undefined, "hubbi.token");
    destroyCookie(undefined, "hubbi.user.id");

    document.location.reload();
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
