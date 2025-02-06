import { useFormatter } from "next-intl";
import { parseISO, format } from "date-fns";
interface inforCLientProps {
  id: string;
  client: any;
  invoice: any;
}
const InfoClient = async ({ id, client, invoice }: inforCLientProps) => {

  let dataInicio = ""
  let dataFinal = ""
  if (invoice['data inicio'] != null){
    dataInicio = format(parseISO(invoice['data inicio']), 'dd/MM/yyyy') || ""
  }

  if (invoice['data final'] != null){
    dataFinal = format(parseISO(invoice['data final']), 'dd/MM/yyyy') || ""
  }


  return (
    <div className="mt-1 flex flex-col text-sm">
      <div className="flex w-full items-center">
        <p className="w-[36%] whitespace-nowrap">
          Cliente Responsável Pelo Veículo
        </p>
        <p className="flex w-full justify-center border-b pb-[0.20rem]">
          {client.nome}
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex w-[50%] gap-2">
          <p className="whitespace-nowrap">CNPJ/CPF:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.CPF_CNPJ}
          </p>
        </div>
        <div className="flex w-full gap-2">
          <p className="whitespace-nowrap">Inscr Estadual/RG:</p>
          <p className="w-full border-b text-center pb-[0.20rem]">
            {client.RG}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-[60%] gap-2">
          <p className="whitespace-nowrap">End.:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.endereco}
          </p>
        </div>
        <div className="flex w-[50%] gap-2">
          <p className="whitespace-nowrap">Bairro:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.bairro}
          </p>
        </div>
        <div className="flex w-[50%] gap-2">
          <p className="whitespace-nowrap">Cidade:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.cidade}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-[30%] gap-2">
          <p className="whitespace-nowrap">Estado:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.estado}
          </p>
        </div>
        <div className="flex w-[20%] gap-2">
          <p className="whitespace-nowrap">Cep:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.Cep}
          </p>
        </div>
        <div className="flex w-[30%] gap-2">
          <p className="whitespace-nowrap">Tel Resd:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.telefone}
          </p>
        </div>
        <div className="flex w-[30%] gap-2">
          <p className="whitespace-nowrap">Celular:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {client.celular}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-[50%] gap-2">
          <p className="">Veículo/Marca:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {`${invoice?.veiculo}/${invoice.marca}`}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="">Cor:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {invoice?.cor}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="">Placa:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem] uppercase">
            {invoice?.placa}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="">Ano:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {invoice?.ano}
          </p>
        </div>
        <div className="flex w-[30%] gap-2">
          <p className="">Modelo:</p>
          <p className="w-full border-b text-center pb-[0.20rem]">
            {invoice?.modelo}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-[50%] gap-2">
          <p className="whitespace-nowrap">Data do contrato:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {/* {handleData(invoice['data inicio'])} */}
            {dataInicio}
          </p>
        </div>
        <div className="flex w-[40%] gap-2">
          <p className="whitespace-nowrap">Data da entrega:</p>
          <p className="w-full whitespace-nowrap border-b text-center pb-[0.20rem]">
            {dataFinal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoClient;
