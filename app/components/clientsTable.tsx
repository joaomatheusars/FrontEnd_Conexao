"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "./dataTable";
import { columns } from "./colums";
import { useState } from "react";

interface TableClientProps {
  token?: string | null;
}

const Table = ({ token }: TableClientProps) => {
  const router = useRouter();
  
  const getClients = async () => {
    const getClients = await fetch("http://localhost:8000/clientes/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (getClients.status !== 200) {
      router.push("/login");
    }

    const data = await getClients.json();
    return data;
  };

  const [dados, setDados] = useState(null);

  if (dados == null) {
    getClients().then((result) => {
      setDados(result);
    });
  }

  return (
    <div className="flex flex-col p-20">
      <div>
        <h1 className="mb-8 text-5xl font-bold text-white">Painel Central</h1>
      </div>
      {dados !== null && <DataTable columns={columns} data={dados} />}
    </div>
  );
};

export default Table;
