import { Separator } from "@/components/ui/separator";
import CurrencyInput from "react-currency-input-field";

interface RowTableProps {
  title?: string;
  row: string;
  onchange?: any;
  id?: any;
  value?: any ;
  valueTitle?: any;
}
const RowTable = ({
  title,
  row,
  onchange,
  value,
  id,
  valueTitle,
}: RowTableProps) => {
  const valor = (t: string) => {
    if (t === "polimento") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
    if (t === "materialPitura") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
    if (t === "eletrica") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
    if (t === "mecanica") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
    if (t === "pecas") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
    if (t === "servTerceiro") {
      if (value === null) {
        return "R$ 0.00"
      }
      return `R$ ${value}`;
    }
  };


  return (
    <>
      {title !== undefined && (
        <div className="mt-8 flex flex-col gap-2">
          <h1 className="font-bold uppercase text-gray-500">Externos</h1>
          <Separator />
        </div>
      )}

      {value === null && (
        <div className="mt-4 grid grid-cols-2">
          <div className="flex items-center">
            <h2 className="font-bold">{row}</h2>
          </div>
          <div>
            <CurrencyInput
              prefix="R$ "
              suffix=""
              placeholder="R$ 0.00"
              decimalsLimit={2}
              decimalSeparator="."
              groupSeparator=","
              type="text"
              onValueChange={(value: any) => onchange(value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
        </div>
      )}

      {value !== null && (
        <div className="mt-4 grid grid-cols-2">
          <div className="flex items-center">
            <h2 className="font-bold">{row}</h2>
          </div>
          <div>
            <CurrencyInput
              prefix="R$ "
              suffix=""
              placeholder={valor(valueTitle)}
              decimalsLimit={2}
              decimalSeparator="."
              groupSeparator=","
              type="text"
              onValueChange={(value: any) => onchange(value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* */}
    </>
  );
};

export default RowTable;
