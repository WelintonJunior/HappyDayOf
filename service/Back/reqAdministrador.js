
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
      acao: "ReadClientes",
      idAcademia,
    }),
  });
  const result = await response.json();
}

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
