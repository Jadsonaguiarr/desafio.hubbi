"use client";
import { getAll } from "@/api/produto";
import type { produto } from "@/api/produto";
import Nav from "@/components/nav";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MeusProdutos() {
  const [produtos, setProdutos] = useState<produto[] | null>(null);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    const produtosFetch = async () => {
      try {
        const response = await getAll(); // Assume que getAll retorna produto[]
        setProdutos(response); // Aqui passamos o array de produtos diretamente
      } catch (error) {
        toast.error("Erro ao carregar os produtos");
        console.log(error);
      } finally {
        setLoanding(false);
      }
    };

    produtosFetch(); // Chama a função assíncrona dentro do useEffect
  }, []);

  if (loanding) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <Nav />
      <main className="p-[2vw]">
        <h1 className="text-[3vw] text-zinc-500 font-semibold mb-[1vh]">
          Meus produtos
        </h1>
        <div className="flex flex-wrap gap-[3vw]">
          {produtos && produtos.length > 0
            ? produtos.map((produto) => (
                <div key={produto.id}>
                  <div
                    key={produto.id}
                    className="w-[17vw] max-h-[45vh] bg-white rounded-lg p-[1vw]"
                  >
                    <p className="mb-[1vh] text-[1vw] border-b-2">
                      <b>#{produto.id}</b>
                    </p>
                    <span className="flex items-center gap-[1vw]">
                      <h3 className="text-[1.3vw] text-zinc-400 font-semibold">
                        Produto:
                      </h3>
                      <p className="text-[1.2vw] truncate">{produto.nome}</p>
                    </span>
                    <p className="text-[1.5vw] text-green-500">
                      Preço: R$ {produto.preco}
                    </p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </main>
    </div>
  );
}
