"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import moment from "moment";

import { getAllByUSer } from "@/api/vendas";
import type { venda } from "@/api/vendas";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "@/components/nav";

export default function Compras() {
  const [compras, setCompras] = useState<venda[]>();
  const { user } = useContext(AuthContext);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        if (user) {
          const response = await getAllByUSer(user.id);
          setCompras(response);
        } else {
          toast.error("Faça login para ver suas compras");
        }
      } catch (error) {
        console.log(error);
        toast.error("Aconteceu um erro ao buscar suas compras");
      } finally {
        setLoanding(false);
      }
    };

    fetchCompras();
  }, [user]);

  if (loanding) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <Nav />
      <ToastContainer />
      <main className="p-[2vw]">
        <h1 className="text-[3vw] font-semibold mb-[2vh] text-zinc-500">
          Minhas compras
        </h1>
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
                    Data da compra: <b>{dataFormatada}</b>
                  </h3>
                  <div className=" flex flex-col gap-[2vh]">
                    {compra.Produto_Venda.map((prod_venda) => {
                      return (
                        <div
                          key={prod_venda.produto.id}
                          className="bg-zinc-200 rounded-lg p-[1vw]"
                        >
                          <p className="font-semibold">
                            {prod_venda.produto.nome}
                          </p>
                          <p>
                            Preço: <b>{prod_venda.produto.preco} R$</b>
                          </p>
                          <p>
                            Quantidade: <b>{prod_venda.qtd_produto}</b>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <span>
                    <p className="text-[1vw] mt-[1vh]">
                      Status: <b>{compra.status}</b>
                    </p>
                    <p className="text-[1vw] mt-[1vh]">
                      Valor Total: <b>{compra.total} R$</b>
                    </p>
                  </span>
                </div>
              );
            })
          ) : (
            <p>Você ainda não realizou nenhuma compra</p>
          )}
        </div>
      </main>
    </div>
  );
}
