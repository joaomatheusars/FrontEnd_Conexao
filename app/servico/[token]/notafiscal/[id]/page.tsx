import BTN from "./btn";
import InfoClient from "../components.tsx/infoClient";
import Info from "../components.tsx/infor";
import TableService from "../components.tsx/tableService";
import TableValue from "../components.tsx/tableValue";
import Footer from "../components.tsx/footer";
import Payments from "../components.tsx/payment";
import HeaderInvoice from "../components.tsx/header";
import Header from "@/components/header";
import { APIData } from "@/app/API/api";

const notaFiscal = async ({ params }: any) => {
  const api = APIData(params.token);
  const invoice = await api.getInvoiceEdit(params.id);

  const servico_terceiro = await api.getTerceiros(Number(params.id));
  const client = await api.getClient(invoice.clienteID);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-300">
        <div className="w-[210mm]">
          <BTN id={params.id} />
        </div>
        <div id="nota" className="min-h-[297mm] w-[210mm] bg-white text-black">
          <div className="flex h-[297mm] flex-col p-2">
            <HeaderInvoice id={params.id} />
            <InfoClient id={params.id} client={client} invoice={invoice} />
            <Payments pagamento={invoice.pagamento} />
            <Info />
            <div className="flex h-full gap-4 ">
              <TableService servico={invoice.Servicos} />
              <TableValue invoice={invoice} terc_servico={servico_terceiro} />
            </div>
          </div>
          <div className="flex justify-center border-t-2">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default notaFiscal;
