//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const ADMINISTRADOR = 1;

const dados = JSON.parse(localStorage.getItem("dados"));
// console.log(dados);

const idAcademia = dados.funIdAcad;
let tela = "";
const btnResumo = document.getElementById("btnResumo");
const btnCliente = document.getElementById("btnCliente");
const btnFicha = document.getElementById("btnFicha");
const btnFuncionario = document.getElementById("btnFuncionario");

document.addEventListener("DOMContentLoaded", async function () {
  const result = await ReadAcademia(idAcademia);
  document.getElementById(
    "admInfo"
  ).innerHTML = `Olá Administrador: ${dados.funNome} da Academia: ${result.acaNome}`;
});

const TelaResumo = document.getElementById("TelaResumo");
const TelaFicha = document.getElementById("TelaFicha");
const TelaClientes = document.getElementById("TelaClientes");
const TelaFuncionarios = document.getElementById("TelaFuncionarios");

const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");

//btnResumo
btnResumo.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaResumo");
});
//btnCliente
btnCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  MostrarTela("TelaClientes");
});
//btnFicha
btnFicha.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaFicha");
});
//btnFuncionario
btnFuncionario.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaFuncionarios");
});

//Ver Clientes

document.addEventListener("DOMContentLoaded", async function () {
  await UpdateListaCliente();
  await UpdateListaFuncionario();
});

//Abrir Modal Cliente

document
  .getElementById("abrirModalRegisterCliente")
  .addEventListener("click", (e) => {
    e.preventDefault();
    modalCadastrarCliente.style.display = "block";
  });

//Fechar Modal Cliente

const fecharModalCadastrarCliente = document.getElementById(
  "fecharModalCadastrarCliente"
);

fecharModalCadastrarCliente.onclick = function () {
  modalCadastrarCliente.style.display = "none";
};

//Clicar Fora fecha o Modal Cliente

window.onclick = function (event) {
  if (event.target == modalCadastrarCliente) {
    modalCadastrarCliente.style.display = "none";
  }
};
//Abrir Modal Funcionario

document
  .getElementById("abrirModalRegisterFuncionario")
  .addEventListener("click", (e) => {
    e.preventDefault();
    modalCadastrarFuncionario.style.display = "block";
  });

//Fechar Modal Funcionario

const fecharModalCadastrarFuncionario = document.getElementById(
  "fecharModalCadastrarFuncionario"
);

fecharModalCadastrarFuncionario.onclick = function () {
  modalCadastrarFuncionario.style.display = "none";
};

//Clicar Fora fecha o Modal Funcionario

window.onclick = function (event) {
  if (event.target == modalCadastrarFuncionario) {
    modalCadastrarFuncionario.style.display = "none";
  }
};

//Função para pegar os dados da api de cep e jogar nos campos

const cliCep = document.getElementById("cliCep");
cliCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("cliCidade").value = data.localidade;
      document.getElementById("cliEstado").value = data.uf;
      document.getElementById("cliRua").value = data.logradouro;
    }
  });
});

const funCep = document.getElementById("funCep");
funCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("funCidade").value = data.localidade;
      document.getElementById("funEstado").value = data.uf;
      document.getElementById("funRua").value = data.logradouro;
    }
  });
});

// Cadastrar Cliente

document
  .getElementById("formCadastrarCliente")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    await RegisterCliente(data, idAcademia);
    await UpdateListaCliente();
    modalCadastrarCliente.style.display = "none";
    e.target.reset();
  });

// //Cadastrar Funcionario

document
  .getElementById("formCadastrarFuncionario")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    await RegisterFuncionario(data, idAcademia);
    await UpdateListaFuncionario();
    modalCadastrarFuncionario.style.display = "none";
    e.target.reset();
  });

// //Arquivar Cliente

// document.querySelectorAll(".arquivarCliente").forEach((element) => {
//   element.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const idCliente = e.target.value;
//     const result = await ArchiveCliente(idCliente);
//     console.log(result);
//   });
// });

function MostrarTela(tela) {
  switch (tela) {
    case "TelaResumo":
      TelaResumo.style.display = "block";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      break;
    case "TelaFicha":
      if (TelaFicha.style.display === "block") {
        TelaFicha.style.display = "none";
        TelaResumo.style.display = "block";
        return;
      }
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "block";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      break;
    case "TelaClientes":
      if (TelaClientes.style.display === "block") {
        TelaClientes.style.display = "none";
        TelaResumo.style.display = "block";

        return;
      }
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "block";
      TelaFuncionarios.style.display = "none";
      break;
    case "TelaFuncionarios":
      if (TelaFuncionarios.style.display === "block") {
        TelaFuncionarios.style.display = "none";
        TelaResumo.style.display = "block";

        return;
      }
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "block";
      break;
  }
}

async function UpdateListaCliente() {
  const result = await ReadCliente(idAcademia);
  //Colocar em alguma lista
  const containerTabela = document.getElementById("tableClientes");
  const tabelaExistente = containerTabela.querySelector("table");
  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }
  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = [
    "Id",
    "Nome",
    "Celular",
    "Status",
    "Ver Detalhes"
  ];
  titulos.forEach((texto) => {
    let th = document.createElement("th");
    th.textContent = texto;
    linhaCabecalho.appendChild(th);
  });

  const corpoTabela = tabela.appendChild(document.createElement("tbody"));

  result.forEach((item) => {
    const linha = corpoTabela.insertRow();
    const camposSelecionados = ["cliId", "cliNome", "cliCelular", "cliStatus"];

    camposSelecionados.forEach((campo) => {
      if (item.hasOwnProperty(campo)) {
        let celula = linha.insertCell();
        celula.textContent = item[campo];
      }
    });
    let celulaBotao = linha.insertCell();
    let botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Ver";
    botaoDetalhes.addEventListener("click", function() {
      console.log("Ver detalhes do item com ID:", item.cliId);
    });
    celulaBotao.appendChild(botaoDetalhes);
  });


  document.getElementById("tableClientes").appendChild(tabela);

  const planos = await ReadPlanos(idAcademia);
  for (i = 0; i < planos.length; i++) {
    document.getElementById(
      "cliPlano"
    ).innerHTML += `<option value=${planos[i].plaId}>${planos[i].plaNome}</option>`;
  }
}

async function UpdateListaFuncionario() {
  const result = await ReadFuncionario(idAcademia);
  //Colocar em alguma lista
  const containerTabela = document.getElementById("tableFuncionarios");
  const tabelaExistente = containerTabela.querySelector("table");
  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }
  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = [
    "Id",
    "Nome",
    "Celular",
    "Status",
    "Ver Detalhes"
  ];
  titulos.forEach((texto) => {
    let th = document.createElement("th");
    th.textContent = texto;
    linhaCabecalho.appendChild(th);
  });

  const corpoTabela = tabela.appendChild(document.createElement("tbody"));

  result.forEach((item) => {
    const linha = corpoTabela.insertRow();
    const camposSelecionados = ["funId", "funNome", "funCelular", "funStatus"];

    camposSelecionados.forEach((campo) => {
      if (item.hasOwnProperty(campo)) {
        let celula = linha.insertCell();
        celula.textContent = item[campo];
      }
    });
    let celulaBotao = linha.insertCell();
    let botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Ver";
    botaoDetalhes.addEventListener("click", function() {
      console.log("Ver detalhes do item com ID:", item.funId);
    });
    celulaBotao.appendChild(botaoDetalhes);
  });


  document.getElementById("tableFuncionarios").appendChild(tabela);
}
