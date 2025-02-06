"use client";

import { ptBR } from "date-fns/locale";
import * as React from "react";
import { addDays, format, min, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { APIData } from "@/app/API/api";

interface DataProps {
  id: string;
}
const Filtro = ({ id }: DataProps) => {
  const api = APIData(localStorage.getItem("access_token"));

  const [status, setStatus] = useState();
  const [servicoFuncionario, setservicoFuncionario] = useState([]);
  const getfuncionariosServico = async () => {
    const _funcionarios = await api.getServicoFuncionario(id);

    if (_funcionarios == 400) {
      setStatus(_funcionarios);
    }
    setservicoFuncionario(_funcionarios);
  };

  if (servicoFuncionario.length == 0) {
    getfuncionariosServico();
  }

  const [date, setDate] = React.useState<DateRange | undefined>();
  const [total, setTotal] = useState(0);
  const valores = servicoFuncionario.map((e: any) => [
    e.data,
    e.valor,
  ]);

  const [totalreal, setTotalreal] = useState(0);
  const sum = async () => {
    await servicoFuncionario;
    let total = 0;
    for (let i = 0; i < valores.length; i++) {
      total = valores[i][1] + total;
    }
    setTotalreal(total);
  };
  sum();

  const consultarTotal = () => {
    const dataInicial = date?.from?.getTime() || 0;
    const dataFinal = date?.to?.getTime();
    let total = 0;

    // setTotalreal(false) 1734490800000
    if (dataFinal == dataInicial) {
      for (let i = 0; i < valores.length; i++) {
        if (
          format(parseISO(valores[i][0]), "dd/MM/yyyy") === new Date(Number(dataInicial)).toLocaleDateString()
        ) {
          total = total + valores[i][1];
        }
      }

      return setTotal(total);
    }

    if (dataFinal == undefined) {
      for (let i = 0; i < valores.length; i++) {
        if (
          format(parseISO(valores[i][0]), "dd/MM/yyyy") == new Date(Number(dataInicial)).toLocaleDateString()
        ) {
          total = total + valores[i][1];
        }
      }

      
      return setTotal(total);
    }
    
    for (let i = 0; i < valores.length; i++) {
      if (
        new Date(valores[i][0]+"T00:00:00").getTime()  >=  dataInicial &&
        new Date(valores[i][0]+"T00:00:00").getTime() <= dataFinal
      ) {
        
        total = total + valores[i][1];
      } else {
        
      }
    }
    return setTotal(total);
  };

  return (
    <div className="flex gap-2">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              // variant={"outline"}
              className={cn(
                " justify-start text-left font-normal flex gap-2",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/y")} -{" "}
                    {format(date.to, "dd/MM/y")}
                  </>
                ) : (
                  format(date.from, "dd/MM/y")
                )
              ) : (
                <span>Escolha uma Data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
            <div className="flex justify-end">
              {date?.from ? (
                <Button onClick={consultarTotal}>Consultar</Button>
              ) : (
                <Button disabled>Consultar</Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-center items-center font-bold text-xl">
        TOTAL:{" "}
        {/* {totalreal
          ? totalreal.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
          : total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })} */}
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
      </div>
    </div>
  );
};

export default Filtro;
