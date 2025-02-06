"use client";
import { APIData } from "@/app/API/api";
import { useState } from "react";
import { DataTable } from "./dataTable";
import { columns } from "./colums";
import Filtro from "./filtro";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import FormServico from "./formServico";

interface ServicoFuncionarioProp {
  id: string;
}

const Table = ({ id }: ServicoFuncionarioProp) => {
  const api = APIData(localStorage.getItem("access_token"));
  const [servicoFuncionario, setservicoFuncionario] = useState([]);
  const [status, setStatus] = useState();

  const getfuncionariosServico = async () => {
    const _funcionarios = await api.getServicoFuncionario(id);

    if (_funcionarios == 400) {
      setStatus(_funcionarios);
    }
    setservicoFuncionario(_funcionarios);
  };

  if (servicoFuncionario.length == 0) {
    getfuncionariosServico();
  }

  if (status == 400) {
    return (
      <div className="flex flex-col p-20">
        <div>
          <h1 className="mb-8 text-5xl font-bold text-white">
            Nenhum serviço Encontrado
          </h1>
        </div>

        <div>
        <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto gap-3 bg-table bg-[#0a0a0a]"
              >
                Cadastrar Serviço <PlusIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-max rounded-lg border-none bg-gray-100 text-black">
              <FormServico id={id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  } else {
    const nome = servicoFuncionario.map((e: any) => e.Funcionarios.Nome);

    return (
      <div className="flex flex-col p-20">
        <div>
          <h1 className="mb-8 text-5xl font-bold text-white">
            <span className="text-2xl text-gray-100">Funcionário</span> <br />
            {nome[0]}
          </h1>
        </div>
        {servicoFuncionario !== null && (
          <DataTable columns={columns} data={servicoFuncionario} id={id} />
        )}
        <Filtro  id={id}/>
      </div>
    );
  }
};

export default Table;
