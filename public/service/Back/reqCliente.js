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