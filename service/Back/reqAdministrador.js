//READ

async function ReadPlanos(idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadPlanos",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFuncionarioDetalhes(idAcademia, funId) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: funId,
      idAcademia,
      acao: "ReadFuncionarioDet",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadClienteDetalhes(idAcademia, cliId) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: cliId,
      idAcademia,
      acao: "ReadClienteDet",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadAcademia(idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadCliente(idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadClientes",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFuncionario(nivel, idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: nivel,
      idAcademia,
      acao: "ReadFuncionarios",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadClienteFicha() {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadClienteFicha",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFichaDetalhes (cliId, tipo) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      data: {cliId, tipo},
      acao: "ReadFichaDetalhes"
    })
  })
  const result = await response.json();
  return result;
}

async function ReadFichaDetalhesGeral (cliId) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      data: cliId,
      acao: "ReadFichaDetalhesGeral"
    })
  })
  const result = await response.json();
  return result;
}

//REGISTER

async function RegisterCliente(data, idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterCliente",
    }),
  });
  const result = await response.json();
  return result;
}

async function RegisterFuncionario(data, idAcademia) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterFuncionario",
    }),
  });
  const result = await response.json();
  return result;
}

async function ArchiveCliente(idCliente) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: idCliente,
      acao: "ArchiveCliente",
    }),
  });

  const result = await response.json();
  return result;
}

async function RegisterBaseFicha(idAcademia, data) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterFicha",
    }),
  });
  const result = await response.json();
  return result;
}

async function RegisterDetalhesFicha(data) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      data,
      acao: "RegisterDetalhesFicha"
    })
  })
  const result = await response.json();
  return result
}

//ARCHIVE

async function ArchiveFuncionario(idFuncionario) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: idFuncionario,
      acao: "ArchiveFuncionario",
    }),
  });

  const result = await response.json();
  return result;
}

//UPDATE

async function UpdateFuncionarioDetalhes(data) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateFuncionarioDetalhes",
    }),
  });
  const result = await response.json();
  return result;
}

async function UpdateClienteDetalhes(data) {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateClienteDetalhes",
    }),
  });
  const result = await response.json();
  return result;
}
