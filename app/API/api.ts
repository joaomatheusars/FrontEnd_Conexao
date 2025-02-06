export const APIData = (access_token: any) => {
  const urlAPI = "http://localhost:8000";
  const header = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Accept: "application/json",
  };

  const putInvoiceFinal = async (data: any) => {
    const invoice = await fetch(
      `${urlAPI}/clientes/finalizarServico?` + new URLSearchParams(data),
      {
        method: "PUT",
        headers: header,
        cache: "no-cache",
      }
    );

    return await invoice;
  };

  const putInvoice = async (data: any) => {
    const invoice = await fetch(
      `${urlAPI}/clientes/updateInvoice?` + new URLSearchParams(data),
      {
        method: "PUT",
        headers: header,
        cache: "no-cache",
      }
    );

    return await invoice;
  };

  const getTerceiros = async (id: any) => {
    const servico = await fetch(
      `${urlAPI}/clientes/getTerceiros?` + new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );

    try {
      return await servico.json();
    } catch {
      return [];
    }
  };

  const getInvoiceEdit = async (id: any) => {
    const invoice = await fetch(
      `${urlAPI}/clientes/getInvoice?` + new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );

    return await invoice.json();
  };

  const getClient = async (id: any) => {
    const client = await fetch(
      `${urlAPI}/clientes/getClient?` + new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );

    const data = await client.json();
    return data;
  };

  const getInvoce = async (id: any) => {
    const invoice = await fetch(
      `${urlAPI}/clientes/getClientInvoce?` + new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );
    const data1 = await invoice.json();
    return data1;
  };

  const getMarca = async () => {
    try {
      const marca = await fetch(`${urlAPI}/clientes/getOptionMarca`, {
        method: "GET",
        headers: header,
        cache: "no-cache",
      });

      const data = await marca.json();
      return data;
    } catch {}
  };

  const getServico = async () => {
    const servico = await fetch(`${urlAPI}/clientes/getOptionServico`, {
      method: "GET",
      headers: header,
      cache: "no-cache",
    });

    const data = await servico.json();
    return data;
  };

  const getServicoFuncionario = async (id: any) => {
    const _servico = await fetch(
      `${urlAPI}/clientes/getServicoFuncionario?` +
        new URLSearchParams({ id: id }),
      {
        method: "GET",
        headers: header,
        cache: "no-cache",
      }
    );
    const data1 = await _servico.json();

    if (_servico.status == 400) {
      return 400;
    }
    return data1;
  };

  const postInvoice = async (data: any, serv: any) => {
    const invoice = await fetch(
      `${urlAPI}/clientes/createInvoice?` + new URLSearchParams(data),
      {
        method: "POST",
        headers: header,
        body: serv,
        cache: "no-cache",
      }
    );

    const invoice_data = invoice;
    return invoice_data;
  };

  const deleteInvoice = async (id: any) => {
    const invoice = await fetch(`${urlAPI}/clientes/deleteInvoice`, {
      method: "DELETE",
      headers: header,
      body: new URLSearchParams({
        id: id,
      }),
    });

    return invoice;
  };

  const addMarca = async (marca: string) => {
    const _marca = await fetch(
      `${urlAPI}/clientes/createMarca?` + new URLSearchParams({ marca: marca }),
      {
        method: "POST",
        headers: header,
        cache: "no-cache",
      }
    );

    return await _marca;
  };

  const addServico = async (servico: string) => {
    const _servico = await fetch(
      `${urlAPI}/clientes/createServico?` +
        new URLSearchParams({ servico: servico }),
      {
        method: "POST",
        headers: header,
        cache: "no-cache",
      }
    );

    return await _servico;
  };

  const addFuncionario = async (nome: any) => {
    const _funcionario = await fetch(
      `${urlAPI}/clientes/createFuncionario?` +
        new URLSearchParams({ nome: nome }),
      {
        method: "POST",
        headers: header,
        cache: "no-store",
      }
    );

    return await _funcionario;
  };

  const removeServico = async (id: any) => {
    const _servico = await fetch(
      `${urlAPI}/clientes/deleteServico?` + new URLSearchParams({ id: id }),
      {
        method: "Delete",
        headers: header,
        cache: "no-cache",
      }
    );

    return await _servico;
  };

  const removeMarca = async (id: any) => {
    const _servico = await fetch(
      `${urlAPI}/clientes/deleteMarca?` + new URLSearchParams({ id: id }),
      {
        method: "Delete",
        headers: header,
        cache: "no-cache",
      }
    );

    return await _servico;
  };

  const getFuncionarios = async () => {
    const _funcionarios = await fetch(`${urlAPI}/clientes/getFuncionarios`, {
      method: "Get",
      headers: header,
      cache: "no-cache",
    });

    const data = await _funcionarios.json();
    return data;
  };

  const addServicoFuncionario = async (servico: any) => {
    const _servico = await fetch(
      `${urlAPI}/clientes/createServicoFuncionario?` +
        new URLSearchParams(servico),
      {
        method: "Post",
        headers: header,
        cache: "no-cache",
      }
    );

    return await _servico;
  };

  const updateServicoFuncionario = async (id: any, data: any) => {
    const res = await fetch(
      `${urlAPI}/clientes/updateServicoFuncionario?` +
        new URLSearchParams(data),
      {
        method: "PUT",
        body: new URLSearchParams({
          id: id,
        }),
        headers: header,
        cache: "no-cache",
      }
    );

    return await res;
  };

  return {
    updateServicoFuncionario,
    addServicoFuncionario,
    getServicoFuncionario,
    addFuncionario,
    getFuncionarios,
    removeMarca,
    removeServico,
    addServico,
    addMarca,
    getMarca,
    getServico,
    getInvoce,
    getClient,
    getInvoiceEdit,
    postInvoice,
    deleteInvoice,
    putInvoice,
    putInvoiceFinal,
    getTerceiros,
  };
};
