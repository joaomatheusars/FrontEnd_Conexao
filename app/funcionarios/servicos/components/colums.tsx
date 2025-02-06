"use client";

import { parseISO, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, getPaginationRowModel } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PlusIcon } from "lucide-react";
import Link from "next/link";
import EditarServico from "./editarServico";
import { DialogTitle } from "@radix-ui/react-dialog";

export type User = {
  id: number;
  servico: string;
  quantidade: number;
  data: Date;
  carro: string;
};

const formatDate = (i: any) => {
  var date = new Date(i.toLocaleString()).toLocaleDateString();

  return date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "carro",
    header: "Carro",
  },
  {
    accessorKey: "servico",
    header: "Serviço",
  },
  {
    accessorKey: "quantidade",
    header: "QTD",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => (
      <div>
        {Number(row.getValue("valor")).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    ),
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{format(parseISO(row.getValue("data")), 'dd/MM/yyyy')}</div>
    // <div>{formatDate(row.getValue("data"))}</div>,
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

            <Dialog>
              <DialogTitle></DialogTitle>
              <DialogTrigger>
                <Button variant="ghost">
                  Editar Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-max rounded-lg border-none bg-gray-100 text-black">
                <EditarServico info={row.original}/>
              </DialogContent>
            </Dialog>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
