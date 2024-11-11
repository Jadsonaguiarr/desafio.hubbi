"use client";

import { getAll } from "@/api/vendas";
import type { venda } from "@/api/vendas";
import Nav from "@/components/nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Total() {
  const [vendas, setVendas] = useState<venda[]>();
  const [loanding, setLoanding] = useState(true);

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
    (venda) => venda.status === "Finalizado"
  );

  return (
    <div>
      <Nav />
      <main className="p-[2vw]">
        <h1 className="text-[3vw] font-semibold text-zinc-500 mb-[1vh]">
          Vendas finalizadas
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
                            <p className="font-semibold">
                              {produtoVenda.produto.nome}
                            </p>
                            <p>{produtoVenda.produto.preco} R$</p>
                            <p>Quantidade: {produtoVenda.qtd_produto}</p>
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
    </div>
  );
}
