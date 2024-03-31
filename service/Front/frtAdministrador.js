//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);

const idAcademia = dados.funIdAcad;

document.addEventListener("DOMContentLoaded", async function () {
  const result = await ReadAcademia(idAcademia);
  document.getElementById(
    "admInfo"
  ).innerHTML = `Olá Administrador: ${dados.funNome} da Academia: ${result.acaNome}`;
});

//Ver Clientes

document.addEventListener("DOMContentLoaded", async function () {
  const result = await ReadCliente(idAcademia);
  //Colocar em alguma lista
  console.log(result);
});

// Cadastrar Cliente

document
  .getElementById("formCadastrarCliente")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const result = await RegisterCliente(data, idAcademia);
    console.log(result);
  });

//Cadastrar Funcionario

document
  .getElementById("formCadastrarFuncionario")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const result = await RegisterFuncionario(data, idAcademia);
    console.log(result);
  });

//Arquivar Cliente

document.querySelectorAll(".arquivarCliente").forEach((element) => {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    const idCliente = e.target.value;
    const result = await ArchiveCliente(idCliente);
    console.log(result);
  });
});
