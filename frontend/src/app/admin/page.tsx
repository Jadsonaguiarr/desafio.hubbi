"use client";
import Nav from "../../components/nav";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type React from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create } from "@/api/produto";
import type { produto } from "@/api/produto";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { vendasMensais } from "@/api/vendas";
import type { dados } from "@/api/vendas";

export default function Admin() {
  const [dados, setDados] = useState<dados>();
  const [produto, setProduto] = useState<produto>({
    nome: "",
    preco: 0,
    qtd: 0,
    id: "",
  });
  const [loanding, setLoanding] = useState(true);

  function handleChangeProduto(e: ChangeEvent<HTMLInputElement>) {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  }

  async function createProduto(e: FormEvent) {
    e.preventDefault();

    await create({ nome: produto.nome, preco: produto.preco });
  }

  useEffect(() => {
    const fetchTotalVendas = async () => {
      try {
        const total = await vendasMensais();

        setDados(total);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao pegar dados das das vendas");
      } finally {
        setLoanding(false);
      }
    };
    fetchTotalVendas();
  }, []);

  if (loanding) {
    return <div>Carregando</div>;
  }

  return (
    <div className="w-full h-full">
      <Nav />
      <ToastContainer />
      <main className=" p-[2vw]">
        <h1 className="text-[3vw] font-semibold text-zinc-500 mb-[2vh]">
          Administração
        </h1>
        <div className="flex items-center gap-[4vw]">
          <div className="bg-zinc-500 w-[20vw] h-[65vh] rounded-xl p-[1vw]">
            <h3 className="text-white text-[1.5vw] font-semibold mb-[3vh]">
              Relatorio mensal
            </h3>

            <span className="w-full">
              <p className="text-white">Total de vendas: </p>
              <div className="w-[10vw] border-2 rounded-lg text-[4vw] text-white text-center mt-[1vh]  mb-[5vh]">
                <b>{dados?.total}</b>
              </div>
            </span>
            <span className="w-full">
              <p className="text-white ">
                Percentual de aumento de vendas mensais:{" "}
              </p>
              <div className="w-[10vw] border-2 rounded-lg text-[4vw] text-white text-center mt-[1vh]">
                <b>{dados?.percentual}%</b>
              </div>
            </span>
          </div>
          <div className="flex flex-col justify-between h-[65vh]">
            <a
              href="admin/vendas"
              className="bg-green-500 hover:bg-green-700 transition-colors h-[30vh] w-[20vw] rounded-xl flex items-center justify-center"
            >
              <h3 className="text-white text-[1.5vw] font-semibold">
                Vendas em aberto
              </h3>
            </a>
            <a
              href="admin/total"
              className="bg-blue-500 hover:bg-blue-700 transition-colors h-[30vh] w-[20vw] rounded-xl flex items-center justify-center"
            >
              <h3 className="text-white text-[1.5vw] font-semibold">
                Vendas finalizadas
              </h3>
            </a>
          </div>
          <div className="flex flex-col justify-between h-[65vh]">
            <Drawer>
              <DrawerTrigger className="bg-yellow-500 w-[20vw] h-[30vh] rounded-xl p-[1vw] hover:bg-yellow-400 transition-colors">
                <h3 className="text-white text-[1.5vw] font-semibold">
                  Adicionar produto
                </h3>
              </DrawerTrigger>
              <DrawerContent className="w-[60vw] p-[2vw] mx-auto bg-slate-100">
                <DrawerClose className="absolute right-[3%]">
                  <IoMdCloseCircleOutline className="text-[2vw] text-zinc-700 hover:text-zinc-500 transition-colors" />
                </DrawerClose>
                <DrawerTitle className="text-[3vw] text-zinc-500 mb-[3vh] ">
                  Adicione o produto
                </DrawerTitle>
                <form
                  className=" flex flex-col gap-[2vh]"
                  onSubmit={createProduto}
                >
                  <div>
                    <Label
                      className="text-[1.3vw] text-zinc-500"
                      htmlFor="name"
                    >
                      Nome
                    </Label>
                    <Input
                      type="text"
                      placeholder="Adicione o nome"
                      name="nome"
                      value={produto.nome}
                      onChange={handleChangeProduto}
                    />
                  </div>
                  <div>
                    <Label
                      className="text-[1.3vw] text-zinc-500"
                      htmlFor="preco"
                    >
                      Preço
                    </Label>
                    <Input
                      type="number"
                      placeholder="Adicione o preço"
                      name="preco"
                      value={produto.preco}
                      onChange={handleChangeProduto}
                    />
                  </div>
                  <DrawerClose className="relative -left-[20.5vw]">
                    <Button className="mt-[3vh] w-[15vw] bg-green-600 hover:bg-green-500 transition-colors">
                      Adicionar
                    </Button>
                  </DrawerClose>
                </form>
              </DrawerContent>
            </Drawer>
            <a
              href="/admin/meus_produtos"
              className="bg-purple-600 hover:bg-purple-500 transition-colors w-[20vw] h-[30vh] rounded-xl p-[1vw] text-white text-[1.5vw] font-semibold flex items-center justify-center"
            >
              Meus produtos
            </a>
          </div>
          <div className="flex flex-col justify-between h-[65vh]">
            <a
              href="admin/todas_compras"
              className="bg-orange-500 hover:bg-orange-700 transition-colors h-[30vh] w-[20vw] rounded-xl flex items-center justify-center"
            >
              <h3 className="text-white text-[1.5vw] font-semibold">
                verificar compras
              </h3>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
