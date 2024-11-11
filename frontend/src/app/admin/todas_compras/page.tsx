"use client";

import { getAll } from "@/api/compra";
import type { Compra } from "@/api/compra";
import Nav from "@/components/nav";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Compras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const compras = await getAll();
        setCompras(compras);
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
  return (
    <div>
      <Nav />
      <main className="p-[2vw]">
        <h1 className="text-[3vw] font-semibold mb-[2vh]">Compras empresa</h1>
        <div className="flex flex-wrap gap-[4vw]">
          {compras && compras.length > 0 ? (
            compras.map((compra) => {
              const dataFormatada = moment(compra.createdAt).format(
                "DD/MM/YYYY"
              );

              return (
                <div
                  key={compra.id}
                  className="w-[20vw] bg-white rounded-lg p-[1vw]"
                >
                  <h3 className="text-[1.3vw] border-b-2 mb-[1vh]">
                    Data da venda: <b>{dataFormatada}</b>
                  </h3>
                  <div className=" flex flex-col gap-[2vh]">
                    {compra.Compra_Produto.map((compraProd) => {
                      return (
                        <div
                          key={compraProd.id}
                          className="bg-zinc-200 rounded-lg p-[1vw]"
                        >
                          <p className="font-semibold">
                            {compraProd.produto.nome}
                          </p>
                          <p>Quantidade: {compraProd.qtd_produto}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[1vw] mt-[1vh]">
                    Status: <b>Comprado</b>
                  </p>
                </div>
              );
            })
          ) : (
            <p>Nenhuma compra encontrada</p>
          )}
        </div>
      </main>
    </div>
  );
}
