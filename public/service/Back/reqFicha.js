// async function ReadFichaCliente(idAcademia, idCliente) {
//   const response = await fetch("/Ficha", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       idAcademia,
//       idCliente,
//       acao: "ReadFicha",
//     }),
//   });
//   const result = await response.json();
//   return result;
// }

// async function RegisterFicha(idAcademia, data) {
//   const response = await fetch("/Ficha", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       data,
//       idAcademia,
//       acao: "RegisterFicha",
//     }),
//   });
//   const result = await response.json();
//   return result;
// }

// async function RegisterDetalhesFicha(data) {
//   const responseLastFicha = await fetch("/Ficha", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       acao: "ReadLastFicha",
//     }),
//   });
//   const resultLastFicha = await responseLastFicha.json();

//   data.lastFicha = resultLastFicha;

//   const response = await fetch("/Ficha", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       data,
//       acao: "RegisterDetalhesFicha",
//     }),
//   });
//   const result = await response.json();
//   return result;
// }

// async function UpdateDetalhesFicha(data) {
//   const response = await fetch("/Ficha", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       data,
//       acao: "UpdateDetalhesFicha",
//     }),
//   });
//   const result = await response.json();
//   return result;
// }





async function ReadClienteFicha(idAcademia) {
  const response = await fetch("/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadClienteFicha",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFichaDetalhes (cliId, tipo) {
  const response = await fetch("/Ficha", {
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
  const response = await fetch("/Ficha", {
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

async function RegisterBaseFicha(idAcademia, data) {
  const response = await fetch("/Ficha", {
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
  const response = await fetch("/Ficha", {
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

async function UpdateCampoFicha(data) {
  const response = await fetch("/Ficha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateCampoFicha",
    }),
  });
  const result = await response.json();
  return result;
}