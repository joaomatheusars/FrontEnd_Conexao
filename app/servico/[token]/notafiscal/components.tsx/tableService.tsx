interface tableProps {
  servico: any;
}

const TableService = async ({ servico }: tableProps) => {
  // console.log(servico)

  const handleCheck = (e: any) => {
    if (e) {
      return "X";
    }
  };

  return (
    <div className="mt-1 flex flex-col gap-4 w-full ">
      <div>
        <div className="mb-1">
          <h3 className="font-bold uppercase">Serviços</h3>
        </div>
        <table className="text-sm">
          <thead>
            <tr>
              <th className="w-[25%] border border-slate-600 pb-[0.20rem]">
                Peças
              </th>
              <th className="w-[10%] border border-slate-600 pb-[0.20rem]">
                Lant.
              </th>
              <th className="w-[10%] border border-slate-600 pb-[0.20rem]">
                Pintura
              </th>
              <th className="w-[10%] border border-slate-600 pb-[0.20rem]">
                Montagem
              </th>
            </tr>
          </thead>
          <tbody>
            {servico.map((e: any) => (
              <tr className="text-center" key={e.id}>
                <td className="border border-slate-700 pb-[0.20rem] whitespace-nowrap">
                  {e.servico}
                </td>
                <td className="border border-slate-700 font-bold pb-[0.20rem]">
                  {handleCheck(e.lanternagem)}
                </td>
                <td className="border border-slate-700 font-bold pb-[0.20rem]">
                  {handleCheck(e.pintura)}
                </td>
                <td className="border border-slate-700 font-bold pb-[0.20rem]">
                  {handleCheck(e.montagem)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableService;
