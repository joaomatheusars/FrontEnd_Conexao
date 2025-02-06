"use client";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/navigation";
import { APIData } from "@/app/API/api";

interface FormServicoProps {
  id: string;
  name: string;
  servico: object[];
  marcaCarro: any;
  token: string;
}
const FormServico = ({
  id,
  name,
  servico,
  marcaCarro,
  token,
}: FormServicoProps) => {
  const router = useRouter();
  const [car, setCar] = useState("");
  const [color, setColor] = useState("");
  const [placa, setPlaca] = useState("");
  const [year, setYear] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [date, setDate] = useState("");

  const [pagamento, setPagamento] = useState("");

  const [serviceList, setServiceList] = useState([
    { service: "", checkbox: [""] },
  ]);

  const handleCheckBox = (e: any, index: number) => {
    const { value, checked } = e.target;
    const list = [...serviceList];

    if (list[index].checkbox[0] === "") {
      const i = list[index].checkbox.indexOf("");
      list[index].checkbox.splice(i);
    }

    if (checked) {
      list[index].checkbox.push(value);
      console.log(list[index].checkbox);
    }
    if (!checked) {
      const i = list[index].checkbox.indexOf(value);
      list[index].checkbox.splice(i, 1);
    }
    setServiceList(list);
  };

  const handleServiceChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index].service = value;

    setServiceList(list);
  };

  const handleMarcaChange = (e: any, index: number) => {
    const { name, value } = e.target;
  };

  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "", checkbox: [] }]);
  };

  const regiterInvoice = async (e: React.FormEvent) => {
    e.preventDefault();

    const api = APIData(token);

    const data = {
      veiculo: car,
      cor: color,
      placa: placa,
      ano: year,
      marca: marca,
      modelo: modelo,
      pagamento: pagamento,
      data_inicio: date,
      clienteID: id,
      servico: JSON.stringify(serviceList),
    };

    const invoice = await api.postInvoice(data, serviceList);
    if (invoice.ok) {
      router.push(`/servico/${token}/${id}`)
    }
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="container flex flex-col gap-8 rounded-md bg-table p-8">
          <h1 className="text-5xl font-extrabold text-white">
            Ordem de Serviço
          </h1>
          <form
            className="flex flex-col gap-6 bg-[#0a0a0a] rounded-sm p-5"
            onSubmit={regiterInvoice}
          >
            <h1 className="text-2xl font-bold text-gray-200">{name}</h1>
            <div className="flex flex-col gap-2" key={"asdasdasczx"}>
              <h1 className="font-bold uppercase text-gray-500">Carro</h1>
              <Separator />
            </div>
            <div className="flex flex-wrap gap-8" key={"asd54as089d4"}>
              <div className="flex items-center gap-4">
                <label>Veículo</label>
                <input
                  id="car"
                  name="car"
                  type="text"
                  maxLength={45}
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  autoComplete="off"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <label>Cor</label>
                <input
                  id="color"
                  name="color"
                  type="text"
                  maxLength={20}
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  autoComplete="off"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label>Placa</label>
                <IMaskInput
                  mask={"aaa-0*00"}
                  id="color"
                  name="color"
                  type="text"
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 uppercase leading-tight text-gray-700 shadow focus:outline-none"
                  required
                  autoComplete="off"
                  value={placa}
                  onChange={(e: any) => setPlaca(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label>Ano</label>
                <IMaskInput
                  mask="0000"
                  name="ano"
                  minLength={2}
                  type="text"
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 uppercase leading-tight text-gray-700 shadow focus:outline-none"
                  min={0}
                  autoComplete="off"
                  value={year}
                  onChange={(e: any) => setYear(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label>Marca</label>
                <select
                  name="service"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  onChange={(e) => setMarca(e.target.value)}
                  defaultValue={"Selecione uma opção"}
                >
                  <option disabled value="Selecione uma opção">
                    Selecione uma opção
                  </option>
                  {marcaCarro.map((s: any, key: any) => (
                    <option className="uppercase" value={s.Marca} key={key}>
                      {s.Marca}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label>Modelo</label>
                <IMaskInput
                  id="modelo"
                  name="modelo"
                  type="text"
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  autoComplete="off"
                  value={modelo}
                  onChange={(e: any) => setModelo(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h1 className="font-bold uppercase text-gray-500">Serviço</h1>
              <Separator />
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4">
                <label className="whitespace-nowrap">Forma de Pagamento</label>
                <select
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  value={pagamento}
                  onChange={(e) => setPagamento(e.target.value)}
                  defaultValue={"Selecione uma opção"}
                >
                  <option selected>
                    Selecione uma opção
                  </option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão">Cartão</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="whitespace-nowrap">Data do Contrato</label>
                <input
                  name="date"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
            </div>
            <Separator />
            {serviceList.map((singleService, index) => (
              <>
                <div key={index} className="flex w-full items-center gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex w-full items-center gap-2">
                      <label className="font-bold">Serviço: </label>
                      <select
                        name="service"
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        onChange={(e) => handleServiceChange(e, index)}
                        defaultValue={"Selecione uma opção"}
                        required
                      >
                        <option value="Selecione uma opção" disabled>
                          Selecione uma opção
                        </option>
                        {servico.map((s: any, key: any) => (
                          <option
                            className="uppercase"
                            value={s.Servico}
                            key={key}
                          >
                            {s.Servico}
                          </option>
                        ))}
                        {/* <option value="Capô">Capô</option>
                      <option value="Tampa traseira">Tampa traseira</option> */}
                      </select>
                    </div>

                    <div className="flex gap-2 ">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="checkbox"
                          id="pintura"
                          value="Pintura"
                          onChange={(e) => handleCheckBox(e, index)}
                        />
                        <label>Pintura</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="checkbox"
                          id="lanternagem"
                          value="Lanternagem"
                          onChange={(e) => handleCheckBox(e, index)}
                        />
                        <label>Lanternagem</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="checkbox"
                          id="montagem"
                          value="Montagem"
                          onChange={(e) => handleCheckBox(e, index)}
                        />
                        <label>Montagem</label>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {serviceList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleServiceRemove(index)}
                          className="rounded bg-red-500 p-1 font-bold hover:bg-red-400"
                        >
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {serviceList.length - 1 === index &&
                  serviceList.length < 20 && (
                    <div>
                      <button
                        type="button"
                        onClick={handleServiceAdd}
                        className="rounded bg-orange-500 p-1 font-bold hover:bg-orange-400"
                      >
                        <Plus />
                      </button>
                    </div>
                  )}
              </>
            ))}

            <button
              type="submit"
              className="rounded bg-green-500 p-3 font-bold hover:bg-green-400"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormServico;
