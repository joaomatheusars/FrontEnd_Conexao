"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
// import CurrencyInput from "react-currency-input-field";
import RowTable from "./rowTable";
// import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";
import CurrencyInput from "react-currency-input-field";
import { APIData } from "@/app/API/api";

interface FinishedServicesProps {
  services: any;
  valor?: any;
  id: number;
}

const FinishedServices = ({ services, id, valor }: FinishedServicesProps) => {
  const router = useRouter();
  const [polimento, setPolimento] = useState(null);
  const [material, setMaterial] = useState(null);
  const [eletrica, setEletrica] = useState(null);
  const [mecanica, setMecanica] = useState(null);
  const [pecas, setPecas] = useState(null);
  const [terceiros, setTerceiros] = useState(null);
  const [data, setData] = useState(null);
  const [desconto, setDesconto] = useState(null);
  const [obs, setObs] = useState(null);
  const servicos = services["Servicos"];
  const [serviceList, setServiceList] = useState(servicos);
  const servicos_ter = services["Servicos Terceiros"];

  const handleService = () => {
    if (servicos && typeof servicos === "object" && Array.isArray(servicos)) {
      const service = servicos;
      return service;
    }

    return [];
  };

  const servicesPrice = (nome: any, value: any, index: any) => {
    const list = [...serviceList];

    if (nome == "Montagem") {
      list[index].montagem_preco = Number(value);
    }

    if (nome == "Pintura") {
      list[index].pintura_preco = Number(value);
    }

    if (nome == "Lanternagem") {
      list[index].lanternagem_preco = Number(value);
    }
  };

  const regiterInvoice = async (e: React.FormEvent) => {

    const data_terceiros = {
      polimento: Number(polimento),
      material_pintura: Number(material),
      eletrica: Number(eletrica),
      mecanica: Number(mecanica),
      pecas: Number(pecas),
      servicos_terceiros: Number(terceiros),
      notafiscalID: Number(id),
    };

    const data_invoice = {
      id: Number(id),
      data_final: data,
      desconto: Number(desconto),
      obs: obs,
      ativo: false,
      servico: JSON.stringify(serviceList),
      ter_servico: JSON.stringify(data_terceiros)
    };

    const api = APIData(localStorage.getItem('access_token'))
    const salvar = await api.putInvoiceFinal(data_invoice)

    if ( salvar.ok){
      router.back()
    }
  };

  const saveServico = async (e: React.FormEvent) => {
    const data_terceiros = {
      polimento: Number(polimento),
      material_pintura: Number(material),
      eletrica: Number(eletrica),
      mecanica: Number(mecanica),
      pecas: Number(pecas),
      servicos_terceiros: Number(terceiros),
      notafiscalID: Number(id),
    };

    const data_invoice = {
      id: Number(id),
      data_final: data,
      desconto: Number(desconto),
      obs: obs,
      servico: JSON.stringify(serviceList),
      ter_servico: JSON.stringify(data_terceiros)
    };

    const api = APIData(localStorage.getItem('access_token'))
    const salvar = await api.putInvoiceFinal(data_invoice)

    if ( salvar.ok){
      router.back()
    }
  };

  const placeholderValue = (value: any) => {
    return `R$ ${value}`;
  };

  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <div className="container flex flex-col gap-8 rounded-md bg-table p-5 bg-[#0a0a0a]">
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            Finalizar Serviço
          </h1>
        </div>

        <form onSubmit={regiterInvoice}>
          <div className=" flex flex-col">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold uppercase text-gray-500">Serviços</h1>
              <Separator />
            </div>

            {/* {qtdService > 0 && coin.length < qtdService && handleServiceAdd()} */}

            {handleService().map((services: any, index: number) => (
              <div key={index} className="mt-4 grid grid-cols-2">
                <div className="flex items-center">
                  <h2 className="font-bold">{services.servico}</h2>
                </div>
                <div className="grid grid-cols-3">
                  {services.montagem && (
                    <div className="flex w-[80%] flex-col gap-2 text-black">
                      <label className="text-white">Montagem</label>
                      <CurrencyInput
                        prefix="R$ "
                        suffix=""
                        placeholder={placeholderValue(services.montagem_preco)}
                        decimalsLimit={2}
                        decimalSeparator="."
                        groupSeparator=","
                        onValueChange={(value, e) =>
                          servicesPrice("Montagem", value, index)
                        }
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      />
                    </div>
                  )}

                  {services.pintura && (
                    <div className="flex w-[80%] flex-col gap-2 text-black">
                      <label className="text-white">Pintura</label>
                      <CurrencyInput
                        prefix="R$ "
                        suffix=""
                        placeholder={placeholderValue(services.pintura_preco)}
                        decimalsLimit={2}
                        decimalSeparator="."
                        groupSeparator=","
                        onValueChange={(value, e) =>
                          servicesPrice("Pintura", value, index)
                        }
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      />
                    </div>
                  )}

                  {services.lanternagem && (
                    <div className="flex w-[80%] flex-col gap-2 text-black">
                      <label className="text-white">Lanternagem</label>
                      <CurrencyInput
                        prefix="R$ "
                        suffix=""
                        placeholder={placeholderValue(
                          services.lanternagem_preco
                        )}
                        decimalsLimit={2}
                        decimalSeparator="."
                        groupSeparator=","
                        onValueChange={(value, e) =>
                          servicesPrice("Lanternagem", value, index)
                        }
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 grid grid-cols-2 items-center">
              <label className="whitespace-nowrap font-bold">
                Data de entrega
              </label>
              <input
                name="date"
                id="date"
                type="date"
                defaultValue={services["data final"]}
                onChange={(e: any) => setData(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"

              />
            </div>
            <div className="mt-4 grid grid-cols-2 items-center">
              <label className="whitespace-nowrap font-bold">Desconto</label>
              <IMaskInput
                mask="00"
                type="text"
                placeholder={`${services.desconto} %`}
                onChange={(e: any) => setDesconto(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            {servicos_ter.map((s: any) => (
              <>
                <RowTable
                  title="Externo"
                  row="polimento"
                  onchange={setPolimento}
                  value={s.polimento}
                  valueTitle="polimento"
                />
                <RowTable
                  row="Material de Pintura"
                  onchange={setMaterial}
                  value={s.material_pintura}
                  valueTitle="materialPitura"
                />
                <RowTable
                  row="Elétrica"
                  onchange={setEletrica}
                  value={s.eletrica}
                  valueTitle="eletrica"
                />
                <RowTable
                  row="Mecânica"
                  onchange={setMecanica}
                  value={s.mecanica}
                  valueTitle="mecanica"
                />
                <RowTable
                  row="Peças"
                  onchange={setPecas}
                  value={s.pecas}
                  valueTitle="pecas"
                />
                <RowTable
                  row="Serv. Terceiros"
                  onchange={setTerceiros}
                  value={s.servicos_terceiros}
                  valueTitle="servTerceiro"
                />
              </>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2">
            <div className="flex">
              <h2 className="font-bold">OBS</h2>
            </div>
            <div>
              <textarea
                name=""
                id=""
                rows={5}
                placeholder={services.obs}
                onChange={(e: any) => setObs(e.target.value)}
                className="w-full focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* onClick={saveServico} */}
          <div className="mt-4 flex w-full gap-2">
            <button
              className="w-full rounded bg-blue-500 p-3 font-bold"
              onClick={saveServico}
              type="button"
            >
              Salvar
            </button>
            <button className="w-full rounded bg-green-500 p-3 font-bold">
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinishedServices;
