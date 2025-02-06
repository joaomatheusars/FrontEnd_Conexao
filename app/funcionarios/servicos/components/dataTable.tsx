"use client";

import { useTransition } from "react";
import { revalidatePath } from "next/cache";

import { useEffect, useState } from "react";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowLeft, ArrowRight, FilterIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APIData } from "@/app/API/api";
import { useRouter } from "next/navigation";
import FormServico from "./formServico";
import Filtro from "./filtro";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  id: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  id,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );


  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleTranslation = (e: string) => {
    if (e === "nome") {
      return "Nome";
    }
    if (e === "CPF_CNPJ") {
      return "CPF/CNPJ";
    }
    if (e === "phone") {
      return "Celular";
    }
    if (e === "telephone") {
      return "Telefone";
    }
    if (e === "actions") {
      return "Ação";
    }
    if (e === "cep") {
      return "CEP";
    }
    return e;
  };

  const api = APIData(localStorage.getItem("access_token"));
  const [funcionario, setFuncionario] = useState("");

  const regiterFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();

    const addfuncionario = await api.addFuncionario(funcionario);

    if (addfuncionario.ok) {
      setFuncionario("");
      window.location.reload();
    }
  };

  return (
    <>
      {/* Table */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Procurar Carro..."
            value={(table.getColumn("carro")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("carro")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-table text-[#0a0a0a]"
          />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {handleTranslation(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>


          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto gap-3 bg-table bg-[#0a0a0a]"
              >
                Cadastrar Serviço <PlusIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-max rounded-lg border-none bg-gray-100 text-black">
            <DialogTitle></DialogTitle>
              <FormServico id={id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-md border bg-table">
        <Table className="bg-[#0a0a0a] rounded-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginator */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="link"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-table"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-table"
        >
          <ArrowRight />
        </Button>
      </div>
    </>
  );
}
