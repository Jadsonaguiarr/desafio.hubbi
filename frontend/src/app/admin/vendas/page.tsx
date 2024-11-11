"use client";
import { useEffect, useState } from "react";

import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAll } from "@/api/vendas";
import type { venda } from "@/api/vendas";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import Nav from "@/components/nav";

import { create, type compraProduto } from "@/api/compra";
import {
  DrawerClose,
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function Vendas() {
  const [vendas, setVendas] = useState<venda[]>();
  const [loanding, setLoanding] = useState(true);
  const [produtosSelecionados, setProdutosSelecionados] =
    useState<compraProduto>();

  function adicionarProdutoSelecionado(data: compraProduto) {
    if (
      produtosSelecionados &&
      produtosSelecionados.id_venda === data.id_venda
    ) {
      if (
        produtosSelecionados.produtos.some(
          (prod) => prod.id === data.produtos[0].id
        )
      ) {
        const novaLista = produtosSelecionados.produtos.filter(
          (prod) => prod.id !== data.produtos[0].id
        );
        if (novaLista.length === 0) {
          setProdutosSelecionados(undefined);
          return;
        }
        setProdutosSelecionados({
          id_venda: data.id_venda,
          produtos: novaLista,
        });
      } else {
        const produtoNovo = [];
        produtosSelecionados.produtos.map((prod) => {
          produtoNovo.push(prod);
        });
        produtoNovo.push(data.produtos[0]);

        setProdutosSelecionados({
          ...produtosSelecionados,
          produtos: produtoNovo,
        });
      }
    } else {
      setProdutosSelecionados({
        id_venda: data.id_venda,
        produtos: data.produtos,
      });
    }
  }

  async function comprarProduto() {
    if (!produtosSelecionados) {
      toast.error("Selecione um item para continuar!");
      return;
    }
    await create(produtosSelecionados);
  }

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const vendas = await getAll();
        setVendas(vendas);
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro ao buscar as vendas");
      } finally {
        setLoanding(false);
      }
    };

    fetchVendas();
  }, []);

  if (loanding) {
    return <div>Carregando</div>;
  }
  const vendasEmAberto = vendas?.filter(
    (venda) => venda.status === "Em preparo"
  );

  return (
    <div>
      <Nav />
      <ToastContainer />
      <main className="p-[2vw]">
        <h1 className="text-[3vw] font-semibold text-zinc-500 mb-[1vh]">
          Vendas em aberto
        </h1>
        <div className="flex flex-wrap gap-[4vw]">
          {vendasEmAberto && vendasEmAberto.length > 0
            ? vendasEmAberto.map((venda) => {
                const dataFormatada = moment(venda.createdAt).format(
                  "DD/MM/YYYY"
                );

                return (
                  <div
                    key={venda.id}
                    className="w-[20vw] bg-white rounded-lg p-[1vw]"
                  >
                    <h3 className="text-[1.3vw] border-b-2 mb-[1vh]">
                      Data da venda: <b>{dataFormatada}</b>
                    </h3>
                    <ScrollArea className="h-[35vh]">
                      <div className="flex flex-col gap-[2vh]">
                        {venda.Produto_Venda.map((produtoVenda) => (
                          <div
                            key={produtoVenda.produto.id}
                            className="bg-zinc-200 rounded-lg p-[1vw]"
                          >
                            <p>
                              Produto: <b>{produtoVenda.produto.nome}</b>
                            </p>
                            <p>
                              Preço: <b>{produtoVenda.produto.preco} R$</b>
                            </p>
                            <p>
                              Quantidade: <b>{produtoVenda.qtd_produto}</b>
                            </p>
                            {produtoVenda.status === "Comprado" ? (
                              <p>
                                Status: <b>Comprado</b>
                              </p>
                            ) : (
                              <span className="flex items-center gap-[1vw] mt-[3vh]">
                                <Checkbox
                                  className="mb-[1vh]"
                                  onClick={() =>
                                    adicionarProdutoSelecionado({
                                      produtos: [
                                        {
                                          id: produtoVenda.id,
                                          id_venda: produtoVenda.id,
                                          id_produto: produtoVenda.id_produto,
                                        },
                                      ],
                                      id_venda: venda.id,
                                    })
                                  }
                                />
                                <p>Selecionar item</p>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <p className="text-[1vw] mt-[1vh]">
                      Status: <b>{venda.status}</b>
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </main>

      <footer className={produtosSelecionados ? "block p-[2vw]" : "hidden"}>
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
                {produtosSelecionados?.produtos?.map((produto) => {
                  return (
                    <div
                      key={produto.id}
                      className="bg-white w-[20vw] rounded-lg p-[1vw]"
                    >
                      <span>
                        <h2>Produto: {produto.id}</h2>
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <DrawerClose className="relative -left-[20vw]">
              <Button
                onClick={() => comprarProduto()}
                className="mt-[3vh] w-[15vw] bg-green-600 hover:bg-green-500 transition-colors"
              >
                Comprar
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </footer>
    </div>
  );
}
