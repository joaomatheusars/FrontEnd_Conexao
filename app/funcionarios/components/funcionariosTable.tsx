'use client'
import { APIData } from "@/app/API/api";
import { useState } from "react";
import { DataTable } from "./dataTable";
import { columns } from "./colums";


const Table = () => {
  const api = APIData(localStorage.getItem("access_token"));

  const [funcionarios, setFuncionarios] = useState([])
  const getfuncionarios = async() =>{
    const _funcionarios = await api.getFuncionarios()

    setFuncionarios(_funcionarios)
  }

  if (funcionarios.length == 0){
    getfuncionarios()
  }

  return (
    <div className="flex flex-col p-20">
      <div>
        <h1 className="mb-8 text-5xl font-bold text-white">Funcionários</h1>
      </div>
      {funcionarios !== null && <DataTable columns={columns} data={funcionarios} />}
    </div>
  );
};

export default Table;
