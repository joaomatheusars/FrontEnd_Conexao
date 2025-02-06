const Footer = () => {
  return (
    <>


      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="">
          <h1>
            Recebi o veículo com os serviços executados de acordo com o
            combinado
          </h1>
        </div>

        <div className="mb-3 flex w-full items-center gap-8 pl-3">
          <div className="w-[60%] border-t-2">
            <p className="text-center">Ass. Cliente responsável pelo veículo</p>
          </div>
          <div className="flex w-[40%] gap-3 pr-3">
            <p>Data</p>
            <p className="w-full border-b-2 text-center"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
