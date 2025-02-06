"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, getPaginationRowModel } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type User = {
  id: string;
  nome: string;
  RG: string;
  CPF_CNPJ: string;
  phone: string;
  // telephone: string | "";
  end: string;
  bairro: string;
  Cidade: string;
  Estado: string;
  Cep: string;
};

// OPÇÂO PARA EXCLUIR USUÀRIO (NÃO É INTERESSANTE)
// const router = useRouter();
// const delUser = async (id: any) => {
//   const res = await fetch("api/delUser", {
//     method: "POST",
//     body: JSON.stringify({
//       id,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (res.ok) {
//     router.refresh()
//   }
// };

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // FORMATA DATA
    // cell: ({row}) => {
    //     const date = new Date(row.getValue('name'))
    //     const formatted = date.toLocaleDateString()
    //     return <div className="'font-medium">{formatted}</div>
    // }
  },
  {
    accessorKey: "RG",
    header: "RG",
  },
  {
    accessorKey: "CPF_CNPJ",
    header: "CPF/CNPJ",
  },
  {
    accessorKey: "celular",
    header: "Celular",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "endereco",
    header: "Endereço",
  },
  {
    accessorKey: "bairro",
    header: "Bairro",
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "cep",
    header: "CEP",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/servico/${localStorage.getItem('access_token')}/criarServico/${user.id}`}>
              <DropdownMenuItem>Criar Serviço</DropdownMenuItem>
            </Link>
            <Link href={`/servico/${localStorage.getItem('access_token')}/${user.id}`}>
              <DropdownMenuItem>Ver Serviço</DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link href={`/editarCliente/${localStorage.getItem('access_token')}/${user.id}`}>
              <DropdownMenuItem>Editar Cliente</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem onClick={() => delUser(user.id)}>
              Excluir Cliente
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
