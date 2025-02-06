import React from "react";

import { APIData } from "@/app/API/api";
import EditarServico from "../components/editarService";
import Header from "@/components/header";

const ViwerServico = async ({ params }: any) => {
  const api = APIData(params.token);

  const invoice = await api.getInvoiceEdit(params.id);
  const servico = await api.getServico();
  const marca = await api.getMarca();

  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <EditarServico
          id={params.id}
          servico={invoice.Servicos}
          invoice={invoice}
          marcaCarro={marca}
          servicoList={servico}
        />
      </div>
    </div>
  );
};

export default ViwerServico;
