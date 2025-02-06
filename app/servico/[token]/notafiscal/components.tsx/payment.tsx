
interface paymentsProps {
  pagamento: string;
}
const Payments = async ({ pagamento }: paymentsProps) => {

  return (
    <div className="mt-2 flex items-center gap-3 ">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold">Forma de Pagamento:</h2>
        <div className="flex items-center justify-center font-bold pt-1">
          {pagamento === "Dinheiro" && (
            <p className="text-center">Dinheiro</p>
          )}
          {pagamento === "Cartão" && (
            <p className="text-center">Cartão + Taxas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
