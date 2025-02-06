import Header from "@/components/header";
import FormServico from "../components/formServico";
import { APIData } from "@/app/API/api";

const Servico = async ({ params }: any) => {
  const api = APIData(params.token);

  const client = await api.getClient(params.id);
  const marca = api.getMarca();
  const servico = api.getServico();

  return (
    <div>
      <Header />
      <div className="flex flex-col p-15">
        <FormServico
          id={params.id}
          token={params.token}
          name={client.nome}
          servico={await servico}
          marcaCarro={await marca}
        />
      </div>
    </div>
  );
};

export default Servico;
