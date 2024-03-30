//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);
const idAcademia = dados.funIdAcad;

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();
  document.getElementById(
    "funInfo"
  ).innerHTML = `Olá Funcionario: ${dados.funNome} da Academia: ${result.acaNome}`;
});

//Cadastrar Atendimento

// document
//   .getElementById("formCadastrarAtendimento")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.target);
//     const data = Object.fromEntries(fd.entries());
//     const response = await fetch("http://localhost:3000/Funcionario", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         data,
//         idAcademia,
//         acao: "RegisterAtendimento",
//       }),
//     });
//     const result = await response.json();
//     console.log(result);
//   });

  //Cadastrar Cliente

// document
//   .getElementById("formCadastrarCliente")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.target);
//     const data = Object.fromEntries(fd.entries());
//     const response = await fetch("http://localhost:3000/Administrador", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         data,
//         idAcademia,
//         acao: "RegisterCliente",
//       }),
//     });
//     const result = await response.json();
//     console.log(result);
//   });


//   //Arquivar Cliente

// document
//   .querySelectorAll(".arquivarCliente")
//   .addEventListener("click", async (e) => {
//     e.preventDefault();
//     const idCliente = e.target.value;
//     const response = await fetch("http://localhost:3000/Administrador", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         data: idCliente,
//         acao: "ArchiveCliente",
//       }),
//     });
//     const result = await response.json();
//     console.log(result);
//   });

//Ver Clientes

// document.addEventListener("DOMContentLoaded", async function () {
//   const response = await fetch("http://localhost:3000/Administrador", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       acao: "ReadClientes",
//     }),
//   });
//   const result = await response.json();
//   //Colocar em alguma lista
//   console.log(result);
// });