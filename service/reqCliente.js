const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia: dados.cliIdAcad,
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();
  document.getElementById(
    "cliInfo"
  ).innerHTML = `Olá Cliente: ${dados.cliNome} da Academia: ${result.acaNome}`;
});
