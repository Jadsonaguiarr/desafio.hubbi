"use client";
import { useContext, useEffect, useState } from "react";

import { IoMdCloseCircleOutline } from "react-icons/io";

import { getAll } from "@/api/produto";
import type { produto } from "@/api/produto";
import { comprarProduto } from "@/api/vendas";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import Nav from "../components/nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "@/contexts/AuthContext";

import image from "../../public/images/produto.jpeg";
import Image from "next/image";

export default function Home() {
  const [produtos, setProdutos] = useState<produto[]>();
  const [loanding, setLoanding] = useState(true);
  const [produtosSelecionados, setProdutosSelecionados] = useState<produto[]>(
    []
  );

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const produtos = await getAll();
        produtos.map((prod) => {
          prod.qtd = 0;
        });
        setProdutos(produtos);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao pegar produtos");
      } finally {
        setLoanding(false);
      }
    };
    fetchProduto();
  }, []);

  function adicionarProdutoSelecionado(e: produto) {
    const verifica = produtosSelecionados?.some((prod) => prod.id === e.id);
    console.log(verifica);
    console.log(e.qtd);

    if (verifica) {
      const novaLista = produtosSelecionados?.filter(
        (prod) => prod.id !== e.id
      );
      setProdutosSelecionados(novaLista);
    } else {
      if (e.qtd === 0) {
        toast.error("A quantidade minima para compra é 1 unidade!");
      }
      setProdutosSelecionados([...produtosSelecionados, e]);
    }
  }

  async function comprar() {
    if (user) {
      const compra = {
        id_comprador: user.id,
        produtos: produtosSelecionados,
      };
      await comprarProduto(compra);
    } else {
      toast.error("Faça login ou cadastre em nossa loja para realiar a compra");
    }
  }

  if (loanding) {
    return <div>Carregando</div>;
  }
  return (
    <div className="h-full ">
      <Nav />
      <ToastContainer />
      <main className="mb-[15vh] p-[2vw]">
        <h1 className="text-[3vw] font-semibold text-zinc-500">Produtos</h1>
        <div className="flex flex-wrap gap-[2.3vw]">
          {produtos && produtos.length > 0 ? (
            produtos.map((produto) => {
              return (
                <div
                  key={produto.id}
                  className=" w-[17vw] min-h-[45vh] bg-white rounded-lg p-[1vw]"
                >
                  <div className="h-[50%] mb-[1vh]">
                    <Image src={image} alt="generic" className="w-full" />
                  </div>
                  <h3 className="text-[1.3vw] text-zinc-400 truncate">
                    {produto.nome}
                  </h3>
                  <p className="text-[1.5vw] text-green-500">
                    R$ {produto.preco}
                  </p>
                  <span className="flex items-center gap-[1vw] mt-[1vh]">
                    <button
                      className="font-bold"
                      type="button"
                      onClick={() => {
                        if (produto.qtd <= 0) {
                          return;
                        }
                        produto.qtd -= 1;
                        setProdutos([...produtos]);
                      }}
                    >
                      -
                    </button>
                    <p className="bg-zinc-300 w-[2.5vw] p-[0.3vw] rounded-md text-center">
                      {produto.qtd}
                    </p>
                    <button
                      className="font-semibold"
                      type="button"
                      onClick={() => {
                        produto.qtd += 1;
                        setProdutos([...produtos]);
                      }}
                    >
                      +
                    </button>
                  </span>
                  <span className="flex items-center gap-[1vw] mt-[3vh]">
                    <Checkbox
                      className="mb-[1vh]"
                      onClick={() => adicionarProdutoSelecionado(produto)}
                    />
                    <p>Selecionar item</p>
                  </span>
                </div>
              );
            })
          ) : (
            <p>Nenhum produto encontrado</p>
          )}
        </div>

        <footer
          className={produtosSelecionados.length > 0 ? "block" : "hidden"}
        >
          <Drawer>
            <DrawerTrigger className="w-[95.5%] h-[10vh] bg-[#FAFF01]  hover:bg-[#E1E600] transition-colors bottom-1 fixed text-[1.4vw]">
              Finalizar compra
            </DrawerTrigger>
            <DrawerContent className="w-[60vw] p-[2vw] mx-auto bg-slate-100">
              <DrawerClose className="absolute right-[3%]">
                <IoMdCloseCircleOutline className="text-[2vw] text-zinc-700 hover:text-zinc-500 transition-colors" />
              </DrawerClose>
              <DrawerTitle className="text-[3vw] text-zinc-500 mb-[3vh] ">
                Finalizar compra
              </DrawerTitle>
              <ScrollArea className="h-[60vh]">
                <div className="flex flex-wrap gap-[4vh] ">
                  {produtosSelecionados?.map((produto) => {
                    return (
                      <div
                        key={produto.id}
                        className="bg-white w-[20vw] rounded-lg p-[1vw]"
                      >
                        <span>
                          <h2>Produto: {produto.nome}</h2>
                          <p> Preço: {produto.preco} R$</p>
                        </span>
                        <span className="flex items-center">
                          Quantidade: {produto.qtd}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <DrawerClose className="relative -left-[20vw]">
                <Button
                  onClick={() => comprar()}
                  className="mt-[3vh] w-[15vw] bg-green-600 hover:bg-green-500 transition-colors"
                >
                  Comprar
                </Button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </footer>
      </main>
    </div>
  );
}
