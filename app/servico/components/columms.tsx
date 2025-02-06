"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { APIData } from "@/app/API/api";

export type Invoice = {
  id: number;
  veiculo: string;
  placa: string;
  marca: string;
  pagamento: string;
  clientID: string;
  ativo: boolean;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "O.S",
  },
  {
    accessorKey: "veiculo",
    header: "Veiculo",
  },
  {
    accessorKey: "placa",
    header: "Placa",
    cell: ({ row }) => {
      return <div className="uppercase">{row.getValue("placa")}</div>;
    },
  },
  {
    accessorKey: "marca",
    header: "Marca",
  },
  {
    accessorKey: "pagamento",
    header: "Pagamento",
  },
  {
    accessorKey: "ativo",
    header: "Finalizado",
    cell: ({ row }) => {
      const finished = row.getValue("ativo");
      if (finished) {
        return <div className="text-green-400">Aberto</div>;
      } else {
        return <div className="text-red-400">Fechado</div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const invoice = row.original;
      const token = localStorage.getItem('access_token')
      const api = APIData(token)
      
      const finishOS = async (id: any) => {
        const res = await api.deleteInvoice(id)
        if (res.ok) {   
          router.refresh()       
        }
      };

      return (
        <>
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
              <Link href={`/servico/${localStorage.getItem('access_token')}/notafiscal/${invoice.id}`}>
                <DropdownMenuItem>Ver Nota</DropdownMenuItem>
              </Link>
              {/* <Link href={`/servico/editar/${invoice.id}`}>
              <DropdownMenuItem>Editar Serviço</DropdownMenuItem>
            </Link> */}
              {invoice.ativo === true && (
                <Link href={`/servico/${localStorage.getItem('access_token')}/finalizar/${invoice.id}`}>
                  <DropdownMenuItem>Finalizar</DropdownMenuItem>
                </Link>
              )}
              <Separator />
              {invoice.ativo === true && (
                <Link href={`/servico/${localStorage.getItem('access_token')}/editar/${invoice.id}`}>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                </Link>
              )}
              {invoice.ativo === true && (
                <DropdownMenuItem onClick={() => finishOS(invoice.id)}>
                  Excluir
                </DropdownMenuItem>
              )}

              {/* <DropdownMenuItem onClick={() => delUser(user.id)}>
              Excluir Cliente
            </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
