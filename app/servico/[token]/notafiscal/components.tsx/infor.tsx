"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Info = () => {
  return (
    <>
        <>
          <div className="flex gap-2 text-xs">
            <div>
              <p>OBS:</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>
                {" "}
                Valor sujeito a alteração na data da entrega, caso haja
                imprevistos, acidentes, falta de peças ou material
              </p>
              <p>Estando assim ciente o reponsável pelo veículo.</p>
              <p>
                O veículo que ficar na oficina após o término do serviços será
                cobrado diária.
              </p>
              <p>
                Qualquer serviço só será iniciado após o adiantamento de 50% e
                só será entregue após o pagamento total.
              </p>
              <p>Orçamento valido até 30 dias</p>
            </div>
          </div>

          <div className="mt-6 flex w-full gap-2">
            {/* <h3 className='whitespace-nowrap'>Assinatura do responsável pelo veículo:</h3> */}
            <p className="w-full whitespace-nowrap border-b text-center"></p>
          </div>
        </>
    </>
  );
};

export default Info;
