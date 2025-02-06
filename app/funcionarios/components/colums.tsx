"use client";

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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import FormServico from "../servicos/components/formServico";
import { Separator } from "@/components/ui/separator";

export type User = {
  id: number;
  Nome: string;
};

// const formatDate = (i: any) => {
//     var date = new Date(i.toLocaleString()).toLocaleDateString()

//     return date
// }

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "Nome",
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-slate-100">
                    Cadastrar Serviço
                  </button>
                </DialogTrigger>
                <DialogContent className="min-w-max rounded-lg border-none bg-gray-100 text-black">
                  <FormServico id={String(user.id)} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <Link href={`/funcionarios/servicos/${user.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                Ver Serviço
              </DropdownMenuItem>
            </Link>
            <Separator />
            <DropdownMenuItem className="cursor-pointer">
              Excluir Funcionário
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => delUser(user.id)}>
              Excluir Cliente
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  // <Dialog>
  //           <DialogTrigger asChild>
  //             <Button
  //               variant="outline"
  //               className="ml-auto gap-3 bg-table bg-[#0a0a0a]"
  //             >
  //               Cadastrar Serviço <PlusIcon />
  //             </Button>
  //           </DialogTrigger>
  //           <DialogContent className="min-w-max rounded-lg border-none bg-gray-100 text-black">
  //             <FormServico id={id}/>
  //           </DialogContent>
  //         </Dialog>
];
