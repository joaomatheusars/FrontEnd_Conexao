import Header from "@/components/header";
import { CheckToken } from "../components/checkToken";
import FormClient from "./components/formClient";

const AddClient = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col p-15">
        <FormClient />
      </div>
    </div>
  );
};

export default AddClient;
