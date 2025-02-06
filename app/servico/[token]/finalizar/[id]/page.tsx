import { APIData } from "@/app/API/api";
import FinishedServices from "../components/finishedServices";
import Header from "@/components/header";

const FinishedInvoice = async ({ params }: any) => {
  const api = APIData(params.token);
  const invoice = await api.getInvoiceEdit(params.id);

  return (
    <div>
      <Header />

      <div className="p-5">
        <FinishedServices services={invoice} id={params.id} valor={"value"} />
      </div>
    </div>
  );
};

export default FinishedInvoice;
