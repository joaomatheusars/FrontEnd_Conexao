"use client";

import { APIData } from "@/app/API/api";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

interface FormProps {
  info: any
}

const EditarServico = ({ info }: FormProps) => {
  const api = APIData(localStorage.getItem("access_token"));
  const [carro, setCarro] = useState(info.carro);
  const [servico, setServico] = useState(info.servico);
  const [quantidade, setquantidade] = useState(info.quantidade);
  const [data, setData] = useState(info.data);
  const [valor, setValor] = useState(info.valor);

  
  const regiterFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();

    const data_servico = {
      carro: carro,
      servico: servico,
      quantidade: Number(quantidade),
      data: data,
      valor: Number(valor),
    };

    const editarServico = await api.updateServicoFuncionario(info.id,data_servico);

    if (editarServico.ok) {
      window.location.reload();
    }
  };
  return (
    <div className="w-full h-full">
      <h3 className="text-center text-xl font-bold p-2">Editar Serviços</h3>
      <form onSubmit={regiterFuncionario}>
        <div>
          <div className="flex flex-col">
            <span>Carro</span>
            <input
              id="carro"
              name="carro"
              type="text"
              className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
              value={carro}
              onChange={(e) => setCarro(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span>Serviço</span>
            <input
              id="servico"
              name="servico"
              type="text"
              className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <span>Quantidade</span>
            <input
              id="quantidade"
              name="quantidade"
              type="number"
              className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
              value={quantidade}
              onChange={(e) => setquantidade(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span>Valor</span>
            <input
              id="valor"
              name="valor"
              type="number"
              min="1"
              step="any"
              className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <span>Data</span>
            <input
              id="data"
              name="data"
              type="date"
              className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
              value={data}
              onChange={(e) => setData(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-full">
          <DialogClose asChild>
            <Button
              color="green"
              // onClick={regiterFuncionario}
              type="submit"
              className="bg-green-400 p-2 text-green-800 transition hover:bg-green-300 w-full mt-2"
            >
              <span>Adicionar</span>
            </Button>
          </DialogClose>
        </div>
      </form>
    </div>
  );
};

export default EditarServico;
