import { Separator } from "@/components/ui/separator";

interface TableValueProps {
  invoice: any;
  terc_servico: any;
}
const TableValue = async ({ invoice, terc_servico }: TableValueProps) => {
  const servico = invoice.Servicos;

  var montagem_preco = 0;
  var pintura_preco = 0;
  var lanternagem_preco = 0;

  servico.map((e: any) => {
    montagem_preco = montagem_preco + e.montagem_preco;
    pintura_preco = pintura_preco + e.pintura_preco;
    lanternagem_preco = lanternagem_preco + e.lanternagem_preco;
  });

  const terceiro = invoice["Servicos Terceiros"][0];

  const total = () => {
    try {
      const total =
        montagem_preco +
        pintura_preco +
        lanternagem_preco +
        terceiro.polimento +
        terceiro.material_pintura +
        terceiro.eletrica +
        terceiro.pecas +
        terceiro.mecanica +
        terceiro.servicos_terceiros;

      return total;
    } catch {
      return 0;
    }
  };

  const totalPagar = () => {
    const t = total();

    return t - (Number(t) * Number(invoice.desconto)) / 100;
  };

  return (
    <>
      <div className="mt-1 flex flex-col w-full gap-1  pl-1 justify-between">
        <div className="w-full ">
          {servico && (
            <div className="">
              <div className="mb-1">
                <h3 className="font-bold uppercase">Total</h3>
              </div>
              <div className="mb-1 flex flex-col gap-2 w-full">
                <div className="w-full">
                  <div className="flex justify-between text-sm pr-3">
                    <div>Montagem</div>
                    <div>R$ {montagem_preco.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between text-sm pr-3">
                    <div>Lanternagem</div>
                    <div>R$ {lanternagem_preco.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Pintura</div>
                    <div>R$ {pintura_preco.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Polimento</div>
                    <div>R$ {terceiro?.polimento.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Material de Pintura</div>
                    <div>R$ {terceiro?.material_pintura.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Elétrica</div>
                    <div>R$ {terceiro?.eletrica.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Peças</div>
                    <div>R$ {terceiro?.pecas.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Mecânica</div>
                    <div>R$ {terceiro?.mecanica.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between text-sm pr-3">
                    <div>Serviços Terceiros</div>
                    <div>
                      R$ {terceiro?.servicos_terceiros.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-1 flex justify-between pr-3 text-sm">
                    <div>Total</div>
                    <p className="">R$ {total().toLocaleString()}</p>
                  </div>
                  <div className="mt-1 flex justify-between text-sm pr-3 font-bold">
                    <div>Desconto</div>
                    <div>{invoice.desconto}%</div>
                  </div>
                </div>

                <div className="flex border-t-2 pt-1 justify-between text-sm pr-3 font-extrabold">
                  <div>Total a Pagar</div>
                  <div>R$ {totalPagar().toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-[50%]  w-[100%]">
          <div className="h-full">
            <h2 className="mb-[0.30rem]">OBS:</h2>
            <div className="h-[90%] border px-2 py-1 text-sm">
              {invoice.obs}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableValue;
