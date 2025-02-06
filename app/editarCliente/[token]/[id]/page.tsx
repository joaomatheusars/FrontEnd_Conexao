import Header from "@/components/header";
import FormClient from "../../components/formClient";

const EditUser = async ({ params }: any) => {
  const data = {
    id: params.id,
  };

  const getCLient = async () => {
    const client = await fetch(
      "http://localhost:8000/clientes/getClient?" + new URLSearchParams(data),
      {
        method: "Get",
        headers: {
          Authorization: `Bearer ${params.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-cache",
      }
    );
    const data1 = await client.json();
    return data1;
  };

  const client = await getCLient();

  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <FormClient client={client} id={params.id} token={params.token} />
      </div>
    </div>
  );
};

export default EditUser;
