"use client";

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Table from "./components/funcionariosTable";
import Filtro from "./servicos/components/filtro";

const Funcionarios = () => {
  const token = localStorage.getItem("access_token");
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <div>
      <Header />
      <Table/>
    </div>
  );
};

export default Funcionarios;
