"use client";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { use, useState } from "react";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/navigation";
import { APIData } from "@/app/API/api";
import { number } from "zod";

interface FormServicoProps {
  id: string;
  servico: object[];
  invoice: any;
  marcaCarro: any;
  servicoList: object[];
}
const EditarServico = ({
  id,
  servico,
  invoice,
  marcaCarro,
  servicoList,
}: FormServicoProps) => {
  const api = APIData(localStorage.getItem('access_token'))
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [color, setColor] = useState(null);
  const [placa, setPlaca] = useState(null);
  const [year, setYear] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [data, setData] = useState(null);
  const [pagamento, setPagamento] = useState(null);
  const [serviceList, setServiceList] = useState([
    { servico: "", checkbox: [""] },
  ]);

  if (data === "") {
    const data = "";
  }


  const handleService = () => {
    if (
      servico &&
      typeof servico === "object" &&
      Array.isArray(servico)
    ) {
      const service = servico;
      return service;
    } 
  };

  const [service = handleService(), setService] = useState(handleService());

  const handleCheckBox = (e: any, index: number) => {
    const { value, checked } = e.target;
    const list = [...service];

    if (e.target.id == 'pintura'){
      list[index].pintura = !list[index].pintura
    }

    if (e.target.id == 'lanternagem'){
      list[index].lanternagem = !list[index].lanternagem
    }

    if (e.target.id == 'montagem'){
      list[index].montagem = !list[index].montagem
    }
  };

  const handleServiceChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...service];
    list[index].servico = value;
    list[index].notafiscalID = Number(id)

    setServiceList(list);
  };

  const handleServiceRemoveInvoice = (index: number) => {
    const list = [...service];
    list.splice(index, 1);
    setService(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...service, service.push({ servico: "", notafiscalID: Number})]);
  };

  const regiterInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const d= {
      veiculo: car,
      cor: color,
      placa: placa,
      ano: year,
      marca: marca,
      modelo: modelo,
      pagamento: pagamento,
      data_inicio: data,
      id: id,
      servico: JSON.stringify(service)
    }


    const putInvoice = await api.putInvoice(d)
    if (putInvoice.ok){
      router.back()
    }



  };

  const checked = (e: any, op: any) => {
    // console.log(e, op)
    for (let i in e) {
      if (e[i] === op) {
        return true;
      }
    }
    return false;
  };


  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="container flex flex-col gap-8 rounded-md bg-table p-8">
          <h1 className="text-5xl font-extrabold text-white">
            Ordem de Serviço - {id}
          </h1>
          <form
            className="flex flex-col gap-6 bg-[#0a0a0a] rounded-sm p-5"
            onSubmit={regiterInvoice}
          >
            <h1 className="text-2xl font-bold text-gray-200">{name}</h1>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold uppercase text-gray-500">Carro</h1>
              <Separator />
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4">
                <label>Veículo</label>
                <input
                  id="car"
                  name="car"
                  type="text"
                  maxLength={30}
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  placeholder={invoice.veiculo}
                  autoComplete="off"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
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
                  placeholder={invoice.cor}
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
                  placeholder={invoice.placa}
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
                  type="text"
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 uppercase leading-tight text-gray-700 shadow focus:outline-none"
                  placeholder={invoice.ano}
                  min={0}
                  autoComplete="off"
                  value={year}
                  onChange={(e: any) => setYear(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center gap-4">
                <label>Marca</label>
                <input
                  id="marca"
                  name="marca"
                  type="text"
                  maxLength={30}
                  className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  placeholder={invoice.marca}
                  autoComplete="off"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div> */}

              <div className="flex items-center gap-4">
                <label>Marca</label>
                <select
                  name="service"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  onChange={(e) => setMarca(e.target.value)}
                >
                  <option selected disabled>
                    {invoice.marca}
                  </option>
                  {marcaCarro.map((s: any) => (
                    <option className="uppercase" value={s.Marca} key={s.id}>
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
                  placeholder={invoice.modelo}
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
                >
                  <option disabled selected value={""}>
                    {invoice.pagamento}
                  </option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão">Cartão + Taxas</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="whitespace-nowrap">Data do Contrato</label>
                <input
                  name="date"
                  id="date"
                  type="date"
                  defaultValue={invoice["data inicio"]}
                  onChange={(e) => setData(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "date")}
                />
              </div>
            </div>
            <Separator />


            {service.map((e: any, index: any) => (
              <>
                <div key={index} className=" flex w-full items-center gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex w-full items-center gap-2">
                      <label className="font-bold">Serviço: </label>
                      <select
                        name="service"
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        onChange={(e) => handleServiceChange(e, index)}
                      >
                        <option selected disabled>
                          {e.servico}
                        </option>
                        {servicoList.map((s: any) => (
                          <option className="uppercase" value={s.name} key={s.id}>
                            {s.Servico}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 ">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="checkbox"
                          id="pintura"
                          defaultChecked={e.pintura}
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
                          defaultChecked={e.lanternagem}
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
                          defaultChecked={e.montagem}
                          onChange={(e) => handleCheckBox(e, index)}
                        />
                        <label>Montagem</label>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {service.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleServiceRemoveInvoice(index)}
                          className="rounded bg-red-500 p-1 font-bold hover:bg-red-400"
                        >
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {service.length - 1 === index &&
                  service.length < 20 && (
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

export default EditarServico;
