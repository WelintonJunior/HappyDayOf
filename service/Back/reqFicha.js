async function ReadFichaCliente(idAcademia, idCliente) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      idCliente,
      acao: "ReadFicha",
    }),
  });
  const result = await response.json();
  return result;
}

async function RegisterFicha(idAcademia, data) {
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
  const responseLastFicha = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadLastFicha",
    }),
  });
  const resultLastFicha = await responseLastFicha.json();

  data.lastFicha = resultLastFicha;

  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "RegisterDetalhesFicha",
    }),
  });
  const result = await response.json();
  return result;
}

async function UpdateDetalhesFicha(data) {
  const response = await fetch("http://localhost:3000/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateDetalhesFicha",
    }),
  });
  const result = await response.json();
  return result;
}
