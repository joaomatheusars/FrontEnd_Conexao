"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HomeIcon,
  Users,
  Landmark,
  LogOut,
  MenuIcon,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { APIData } from "@/app/API/api";

const Menu = () => {
  const api = APIData(localStorage.getItem("access_token"));

  const [marcas, setMarcas] = useState([]);
  const [servicos, setServicos] = useState([]);

  const t = async () => {
    const marcas = await api.getMarca();
    const servicos = await api.getServico();

    setMarcas(marcas);
    setServicos(servicos);
  };

  try{
    if (marcas.length == 0) {
      t();
    }
  } catch{}

  const router = useRouter();
  const [marca, setModalMarca] = useState(false);
  const [removemarca, setModalRemoveMarca] = useState(false);
  const [valuMarca, setMarca] = useState("");

  const [modal, setModal] = useState(false);
  const [remove, setRemoveService] = useState(false);
  const [service, setService] = useState("");
  const [serv, setServico] = useState("");

  if (!localStorage.getItem("access_token")) {
    router.push("/login");
  }

  const home = () => {
    router.push("/");
  };

  const funcionarios = () =>{
    router.push('/funcionarios')
  }

  const removeMarcaModal = () => {
    setModalRemoveMarca(!removemarca);
  };

  const removeService = () => {
    setRemoveService(!remove);
  };

  const toggleModalMarca = () => {
    setModalMarca(!marca);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const registerMarca = async (e: React.FormEvent) => {
    e.preventDefault();

    const addMarca = await api.addMarca(valuMarca);
    if (addMarca.ok) {
      setMarca("");
      t();
      router.refresh();
    }
  };

  const removeMarca = async (e: React.FormEvent) => {
    e.preventDefault();

    const _marca = await api.removeMarca(serv);

    if (_marca.ok) {
      setServico("");
      t();
      router.refresh();
    }
  };

  const regiterServico = async (e: React.FormEvent) => {
    e.preventDefault();

    const addServico = await api.addServico(service);

    if (addServico.ok) {
      setService("");
      t();
      router.refresh();
    }
  };

  const removeServiceDB = async (e: React.FormEvent) => {
    e.preventDefault();

    const _remove = await api.removeServico(serv);

    if (_remove.ok) {
      setServico("");
      t();
      router.refresh();
    }
  };

  return (
    <>
      <div className="bg flex w-full items-center p-4 ">
        <Sheet>
          <SheetTrigger>
            {" "}
            <MenuIcon color="black" size={32} />{" "}
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#0a0a0a]">
            <SheetHeader className="h-full">
              <SheetTitle>Menu</SheetTitle>
              <Separator />

              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <SheetClose>
                    <div
                      className="mt-4 flex items-center gap-4  text-base"
                      onClick={() => home()}
                    >
                      <HomeIcon size={20} />
                      <div>
                        <h3 className="font-bold">Inicio</h3>
                      </div>
                    </div>
                  </SheetClose>

                  <SheetClose>
                    <div
                      className="flex items-center gap-4  text-base"
                      onClick={() => funcionarios()}
                    >
                      <Users size={20} />
                      <div>
                        <h3 className="font-bold">Funcionarios</h3>
                      </div>
                    </div>
                  </SheetClose>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-none"
                  >
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="py-0 hover:no-underline">
                        <div className="flex items-center gap-4 text-base font-bold">
                          <Wrench size={20} className="flex" />
                          Serviço
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <div className="flex flex-col gap-4 py-4 pb-1 pl-5">
                          <SheetClose>
                            <div
                              className="flex items-center gap-4"
                              onClick={toggleModal}
                            >
                              <Plus size={20} />
                              <div>
                                <h3 className="font-bold">Adicionar</h3>
                              </div>
                            </div>
                          </SheetClose>
                          <SheetClose>
                            <div
                              className="flex items-center gap-4"
                              onClick={removeService}
                            >
                              <Trash2 size={20} />
                              <div>
                                <h3 className="font-bold">Remover</h3>
                              </div>
                            </div>
                          </SheetClose>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-none"
                  >
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="py-0 hover:no-underline">
                        <div className="flex items-center gap-4 text-base font-bold">
                          <Landmark size={20} className="flex" />
                          Marca
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <div className="flex flex-col gap-4 py-4 pl-5">
                          <SheetClose>
                            <div
                              className="flex items-center gap-4"
                              onClick={toggleModalMarca}
                            >
                              <Plus size={20} />
                              <div>
                                <h3 className="font-bold">Adicionar</h3>
                              </div>
                            </div>
                          </SheetClose>
                          <SheetClose>
                            <div
                              className="flex items-center gap-4"
                              onClick={removeMarcaModal}
                            >
                              <Trash2 size={20} />
                              <div>
                                <h3 className="font-bold">Remover</h3>
                              </div>
                            </div>
                          </SheetClose>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                {/* <SheetClose>
                  <div className="mt-4 flex items-center gap-4" onClick={sair}>
                    <LogOut size={20} />
                    <div>
                      <h3 className="font-bold">Sair</h3>
                    </div>
                  </div>
                </SheetClose> */}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {removemarca && (
        <Dialog open={removemarca} onOpenChange={removeMarcaModal}>
          <DialogContent className="m-auto flex h-[30%] w-[30%] flex-col items-center justify-center rounded-lg border-none bg-gray-100 p-5 text-black">
            <form onSubmit={regiterServico}>
              <div className="flex flex-col gap-5">
                <div className="text-center text-xl font-bold">
                  Remover Marca
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <label>Marca</label>
                    <select
                      name="service"
                      className="focus:shadow-outline w-full appearance-none rounded bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      onChange={(e: any) => setServico(e.target.value)}
                      required
                    >
                      <option selected disabled>
                        Selecione uma opção
                      </option>
                      {marcas.map((e: any) => (
                        <option className="capitalize" value={e.id} key={e.id}>
                          {e.Marca}
                        </option>
                      ))}
                    </select>
                  </div>

                  <DialogClose asChild>
                    <Button
                      color="green"
                      onClick={removeMarca}
                      type="submit"
                      className="bg-red-400 p-2 text-red-800 transition hover:bg-red-300"
                    >
                      remover
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {marca && (
        <Dialog open={marca} onOpenChange={toggleModalMarca}>
          <DialogContent className="m-auto flex h-[30%] w-[30%] flex-col items-center justify-center rounded-lg border-none bg-gray-100 p-5 text-black">
            <form onSubmit={regiterServico}>
              <div className="flex flex-col gap-5">
                <div className="text-center text-xl font-bold">
                  Adicionar Marca
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <label>Marca</label>
                    <input
                      id="marca"
                      name="marca"
                      type="text"
                      className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
                      required
                      autoComplete="off"
                      value={valuMarca}
                      onChange={(e: any) => setMarca(e.target.value)}
                    />
                  </div>

                  <DialogClose>
                    <Button
                      color="green"
                      onClick={registerMarca}
                      type="submit"
                      className="bg-green-400 p-2 text-green-800 transition hover:bg-green-300"
                    >
                      <span>Adicionar</span>
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {modal && (
        <Dialog open={modal} onOpenChange={toggleModal}>
          <DialogContent className="m-auto flex h-[30%] w-[30%] flex-col items-center justify-center rounded-lg border-none bg-gray-100 p-5 text-black">
            <form onSubmit={regiterServico}>
              <div className="flex flex-col gap-5">
                <div className="text-center text-xl font-bold">
                  Adicionar Serviço
                </div>
                <div className="flex items-center gap-3">
                  <label>Serviço</label>
                  <input
                    id="service"
                    name="service"
                    type="text"
                    className="focus:shadow-outline ,23 appearance-none rounded px-3 py-2 capitalize leading-tight shadow focus:outline-none"
                    required
                    autoComplete="off"
                    value={service}
                    onChange={(e: any) => setService(e.target.value)}
                  />
                </div>

                <Button
                  color="green"
                  onClick={regiterServico}
                  type="submit"
                  className="bg-green-400 p-2 text-green-800 transition hover:bg-green-300"
                >
                  <span>Adicionar</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {remove && (
        <Dialog open={remove} onOpenChange={removeService}>
          <DialogContent className="m-auto flex h-[30%] w-[30%] flex-col items-center justify-center rounded-lg border-none bg-gray-100 p-5 text-black">
            <form onSubmit={regiterServico}>
              <div className="flex flex-col gap-5">
                <div className="text-center text-xl font-bold">
                  Remover Serviço
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <label>Serviço</label>
                    <select
                      name="service"
                      className="focus:shadow-outline w-full appearance-none rounded bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      onChange={(e: any) => setServico(e.target.value)}
                      required
                    >
                      <option selected disabled>
                        Selecione uma opção
                      </option>
                      {servicos.map((e: any) => (
                        <option className="capitalize" value={e.id} key={e.id}>
                          {e.Servico}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    color="green"
                    onClick={removeServiceDB}
                    type="submit"
                    className="bg-red-400 p-2 text-red-800 transition hover:bg-red-300"
                  >
                    <span>remover</span>
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Menu;
