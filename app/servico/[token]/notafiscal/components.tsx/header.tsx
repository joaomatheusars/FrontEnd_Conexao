import { APIData } from "@/app/API/api";

interface headerProps {
  id: number;
}

const HeaderInvoice = async ({ id }: headerProps) => {
  const handleOs = () => {
    const os = id.toString();

    if (os != undefined) {
      if (os.length === 1) {return "00000" + os;}
      if (os.length === 2) {return "0000" + os;}
      if (os.length === 3) {return "000" + os;}
      if (os.length === 4) {return "00" + os;}
      if (os.length === 5) {return "0" + os;}
      if (os.length >= 6) {return os;}
    }
  };

  return (
    <div className="flex w-full rounded-3xl border-2 border-black">
      <div className="flex w-[85%] flex-col">
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-[30px] font-bold uppercase">Conexao</h1>
          <h3 className="text-xl font-bold">Lanternagem e Pintura</h3>
        </div>

        <div className="flex items-end justify-center gap-2">
          <p>(61) </p>
          <p className="text-[18px] font-bold">98419-0120 / 98210-4851</p>
        </div>

        <div className="mb-3 flex justify-center">
          <p>Qd. 600 Conj. 07 Lote 21 - Pró-DF - Recanto das Emas/DF</p>
        </div>
      </div>

      <div className="flex w-[15%] flex-col items-center border-l-2  border-black pt-5">
        <h2 className="font-bold">O.S</h2>

        <p className="text-red-500">{handleOs()}</p>
      </div>
    </div>
  );
};

export default HeaderInvoice;
