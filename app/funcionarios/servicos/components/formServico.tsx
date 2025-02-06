"use client";

import { APIData } from "@/app/API/api";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

interface FormProps {
  id: string;
}

const FormServico = ({ id }: FormProps) => {
  const api = APIData(localStorage.getItem("access_token"));
  const [carro, setCarro] = useState("");
  const [servico, setServico] = useState("");
  const [quantidade, setquantidade] = useState("");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");

  const regiterFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(data)
    const data_servico = {
      id_funcionario: id,
      carro: carro,
      servico: servico,
      quantidade: Number(quantidade),
      data: data,
      valor: Number(valor),
    };

    const addfuncionario = await api.addServicoFuncionario(data_servico);

    if (addfuncionario.ok) {
      window.location.reload();
    }
  };
  return (
    <div className="w-full h-full">
      <h3 className="text-center text-xl font-bold p-2">Adicionar Serviços</h3>
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

export default FormServico;
