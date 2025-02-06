import Header from "@/components/header";
import Table from "../components/funcionariosTable";
import Filtro from "../components/filtro";


const ServicosFuncionarios =  async ({ params }: any) => {

  return (
    <div>
      <Header />
      <Table id={params.id}/>
    </div>
  );
};

export default ServicosFuncionarios;
