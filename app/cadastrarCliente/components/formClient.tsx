"use client";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { useCepService } from "@/app/components/getCEP";
import { CheckToken } from "@/app/components/checkToken";


const FormClient = () => {
  
  const router = useRouter();
  const token = localStorage.getItem('access_token')
  const [name, setName] = useState("");
  const [cpf_cnpj, setCPF] = useState("");
  const [rg, setRG] = useState("");
  const [phone, setCel] = useState("");
  const [telephone, setTel] = useState("");
  const [end, setEnd] = useState("");
  const [bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  const [Cep, setCEP] = useState("");
  const [error, setError] = useState<string | null>(null);

  const cepService = useCepService();

  const as = (e: string) => {
    if (e.length > 14) {
      return "00.000.000/0000-00";
    }
    if (e.length < 14) {
      return "000.000.000-00";
    }
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      nome : name,
      RG: rg,
      CPF_CNPJ: cpf_cnpj,
      celular: phone,
      telefone: telephone,
      endereco: end,
      bairro: bairro,
      cidade: Cidade,
      estado: Estado,
      cep: Cep
    }

    try{
      const res = await fetch("http://localhost:8000/clientes/createClient?" + new URLSearchParams(data),{
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.ok){
        router.push('/')
      }

      if (res.status == 401){
        router.push('/login')
      }
    } catch (error : any) {
      console.log(error)
    }
  };

  const handleGetCEP = async () => {
    const formatedCEP = Cep.replace("-", "");

    const address = cepService?.getAddress(formatedCEP);
    const value = await address;
    
    if (value === true) {
      return setError("Não foi possivel encontrar o endereço")
    }

    setEnd(value?.end);
    setBairro(value?.bairro);
    setCidade(value?.cidade);
    setEstado(value?.estado);
    setError(null)
  };

  const handleDisabledButton = () => {
    if (Cep.length < 9){
      return true
    }

    return false
  }
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col gap-8 rounded-md bg-table p-8">
        <h1 className="text-5xl font-extrabold text-white">
          Cadastrar Cliente
        </h1>
        <form className="flex flex-col gap-6 bg-[#0a0a0a] p-5 rounded-sm" onSubmit={registerUser}>
          {error && <Alert>{error}</Alert>}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase text-gray-500">Cliente</h3>
            <Separator />
          </div>

          <div className="flex w-full flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <label>Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                minLength={4}
                maxLength={50}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <label>CPF/CPNJ</label>
              <IMaskInput
                mask={as(cpf_cnpj)}
                id="rg"
                name="rg"
                type="text"
                minLength={14}
                autoComplete="off"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={cpf_cnpj}
                onChange={(e: any) => setCPF(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <label>RG</label>
              <div className="flex flex-col items-center justify-center">
                <IMaskInput
                  mask="0.000.000"
                  id="rg"
                  name="rg"
                  type="text"
                  minLength={9}
                  autoComplete="off"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  value={rg}
                  onChange={(e: any) => setRG(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label>Telefone</label>
              <IMaskInput
                mask="(00) 0000-0000"
                id="phone"
                name="phone"
                type="text"
                minLength={14}
                autoComplete="off"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={telephone}
                onChange={(e: any) => setTel(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label>Celular</label>
              <IMaskInput
                mask="(00) 00000-0000"
                id="phone"
                name="phone"
                minLength={15}
                type="text"
                required
                autoComplete="off"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={phone}
                onChange={(e: any) => setCel(e.target.value)}
              />
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold uppercase text-gray-500">Endereço</h3>
                <Separator />
              </div>

              <div className="mt-4 flex flex-wrap gap-8">
                <div className="flex items-center gap-4">
                  <label>Endereco</label>
                  <input
                    id="end"
                    name="end"
                    type="text"
                    minLength={4}
                    maxLength={30}
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    autoComplete="off"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <label>Bairro</label>
                    <input
                      id="bairro"
                      name="bairro"
                      type="text"
                      minLength={4}
                      maxLength={30}
                      autoComplete="off"
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <label>Cidade</label>
                    <input
                      id="cidade"
                      name="cidade"
                      type="text"
                      minLength={4}
                      maxLength={30}
                      autoComplete="off"
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      value={Cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <label>Estado</label>
                    <input
                      id="estado"
                      name="estado"
                      type="text"
                      minLength={4}
                      maxLength={30}
                      autoComplete="off"
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      value={Estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <label>CEP</label>
                    <IMaskInput
                      mask="00000-000"
                      id="cep"
                      name="cep"
                      type="text"
                      minLength={9}
                      autoComplete="off"
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      value={Cep}
                      onChange={(e: any) => setCEP(e.target.value)}
                      // onChange={(e: any) => handleGetCEP(e.target.value)}
                    />
                    <button
                      onClick={handleGetCEP}
                      type="button"
                      className="flex gap-3 rounded-full bg-blue-500 hover:bg-blue-400 p-2 font-bold cursor-pointer"
                      disabled={handleDisabledButton()}
                    >
                      <Search />
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="rounded bg-green-500 p-3 font-bold hover:bg-green-400"
            onSubmit={registerUser}
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormClient;