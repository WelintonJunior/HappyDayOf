//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia: dados.funIdAcad,
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();
  document.getElementById(
    "admInfo"
  ).innerHTML = `Olá Administrador: ${dados.funNome} da Academia: ${result.acaNome}`;
});
