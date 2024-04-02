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

async function RegisterAtendimento(idAcademia, data) {
  const response = await fetch("http://localhost:3000/Funcionario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterAtendimento",
    }),
  });
  const result = await response.json();
  return result;
}

async function RegisterCliente(idAcademia, data) {
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

async function ReadClientes(idAcademia) {
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
