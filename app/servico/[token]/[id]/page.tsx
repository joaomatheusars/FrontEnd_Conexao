import React from "react";
import { DataTable } from "../../components/dataTable";
import { columns } from "../../components/columms";
import { APIData } from "@/app/API/api";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

const Servico = async ({ params }: any) => {
  const api = APIData(params.token);

  const invoice = await api.getInvoce(params.id);

  if (invoice == null) {
    return (
      <div className="flex flex-col p-20 justify-center items-center gap-5 h-screen ">
        <h1 className="font-extrabold text-5xl text-gray-800">
          Nenhum resultado encontrado
        </h1>
        <div className="flex gap-5">
          <Button variant="secondary">
            <a href="/" className="text-2xl">
              Voltar
            </a>
          </Button>
          <Button>
            <a
              href={`/servico/${params.token}/criarServico/${params.id}`}
              className="text-2xl"
            >
              Criar Serviço
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-16">
        <div>
          <h1 className="mb-8 text-5xl font-bold text-white">
            {invoice[0].Cliente.nome}
          </h1>
        </div>
        <DataTable columns={columns} data={invoice} id={params.id} />
      </div>
    </div>
  );
};

export default Servico;
