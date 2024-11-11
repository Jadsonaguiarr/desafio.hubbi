"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import type React from "react";
import Nav from "../../components/nav";
import { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";
import { create } from "@/api/user";
import type { user } from "@/api/user";

interface credentials {
  cpf: string;
  password: string;
}

export default function Login() {
  const [credentials, setCredentials] = useState<credentials>({
    cpf: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [admin, setAdmin] = useState(true);
  const [user, setUser] = useState<user>({
    admin: admin,
    cpf: "",
    nome: "",
    password: "",
  });

  function handleChangeCredentials(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handleChangeUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function adminF() {
    setAdmin(!admin);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await login(credentials);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
console.log(user)
    await create(user);
  }

  return (
    <div>
      <Nav />
      <main className="flex flex-col items-center mt-[10vh]">
        <form
          className="w-[30vw] flex flex-col gap-[4vh] mb-[3vh]"
          onSubmit={handleLogin}
        >
          <h1 className="text-[3vw] font-semibold text-zinc-500">Login</h1>
          <div>
            <Label className="text-[1.3vw] text-zinc-500" htmlFor="cpf">
              CPF
            </Label>
            <Input
              placeholder="Adicione seu CPF"
              name="cpf"
              value={credentials.cpf}
              onChange={handleChangeCredentials}
            />
          </div>
          <div>
            <Label className="text-[1.3vw] text-zinc-500" htmlFor="password">
              Senha
            </Label>
            <Input
              type="password"
              placeholder="Adicione sua senha"
              name="password"
              value={credentials.password}
              onChange={handleChangeCredentials}
            />
          </div>
          <Button className="bg-zinc-500 transition-colors duration-300">
            Entrar
          </Button>
        </form>
        <Drawer>
          <DrawerTrigger className="text-[1vw] hover:text-zinc-400 transition-colors ">
            Ainda não tem conta? Clique aqui!
          </DrawerTrigger>
          <DrawerContent className="w-[60vw] p-[2vw] mx-auto">
            <DrawerClose className="absolute right-[3%]">
              <IoMdCloseCircleOutline className="text-[2vw] text-zinc-700 hover:text-zinc-500 transition-colors" />
            </DrawerClose>
            <form
              className="flex flex-col gap-[4vh] mb-[3vh]"
              onSubmit={handleCreate}
            >
              <DrawerTitle className="text-[3vw] text-zinc-500">
                Cadastrar
              </DrawerTitle>
              <div>
                <Label className="text-[1.3vw] text-zinc-500" htmlFor="nome">
                  Nome
                </Label>
                <Input
                  placeholder="Adicione seu nome"
                  required
                  name="nome"
                  value={user.nome}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <Label className="text-[1.3vw] text-zinc-500" htmlFor="cpf">
                  CPF
                </Label>
                <Input
                  placeholder="Adicione seu CPF"
                  required
                  name="cpf"
                  value={user.cpf}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <Label
                  className="text-[1.3vw] text-zinc-500"
                  htmlFor="password"
                >
                  Senha
                </Label>
                <Input
                  placeholder="Adicione sua senha"
                  required
                  name="password"
                  value={user.password}
                  onChange={handleChangeUser}
                />
              </div>
              <div className="flex items-center gap-[1.5vw]">
                <Label
                  className="text-[1.3vw] text-zinc-500"
                  htmlFor="password"
                >
                  Admin
                </Label>
                <Checkbox onClick={() => adminF} />
              </div>
              <Button className="bg-zinc-500 transition-colors duration-300">
                Me cadastrar
              </Button>
            </form>
          </DrawerContent>
        </Drawer>
      </main>
      <ToastContainer />
    </div>
  );
}
