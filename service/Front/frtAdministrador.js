//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const ADMINISTRADOR = 1;
let dados = [];
try {
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage;
  } else {
    alert("Acesso Negado")
    window.location.href = "../index.html";
  }
} catch(err) {
  alert("Acesso Negado")
  window.location.href = "../index.html";
}

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
const TelaDetalhesClientes = document.getElementById("TelaDetalhesClientes");
const TelaFuncionarios = document.getElementById("TelaFuncionarios");
const TelaDetalhesFuncionarios = document.getElementById(
  "TelaDetalhesFuncionarios"
);
const btnEditarDetalhesFuncionario = document.getElementById(
  "btnEditarDetalhesFuncionario"
);
const btnEnviarDetalhesFuncionario = document.getElementById(
  "btnEnviarDetalhesFuncionario"
);
const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnArchiveCliente = document.getElementById("btnArchiveCliente");
const btnArchiveFuncionario = document.getElementById("btnArchiveFuncionario");

const formDetCliente = document.getElementById("formDetalhesCliente");
const formDetFuncionario = document.getElementById("formDetalhesFuncionario");

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

//Ver Clientes/Funcionarios

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

const funDetCep = document.getElementById("funDetCep");
funDetCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("funDetCidade").value = data.localidade;
      document.getElementById("funDetEstado").value = data.uf;
      document.getElementById("funDEtRua").value = data.logradouro;
    }
  });
});

const cliDetCep = document.getElementById("cliDetCep");
cliDetCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("cliDetCidade").value = data.localidade;
      document.getElementById("cliDetEstado").value = data.uf;
      document.getElementById("cliDetRua").value = data.logradouro;
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

//Cadastrar Funcionario

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

//Mudar o conteudo da tela

function MostrarTela(tela) {
  let inputsCliente = formDetCliente.querySelectorAll(
    "input, select, textarea"
  );
  inputsCliente.forEach((input) => {
    input.disabled = true;
  });
  btnEnviarDetalhesCliente.style.display = "none";
  btnEditarDetalhesCliente.style.display = "block";
  formDetCliente.reset();

  let inputsFuncionario = formDetFuncionario.querySelectorAll(
    "input, select, textarea"
  );
  inputsFuncionario.forEach((input) => {
    input.disabled = true;
    btnEnviarDetalhesFuncionario.style.display = "none";
    btnEditarDetalhesFuncionario.style.display = "block";
  });
  formDetFuncionario.reset();

  TelaDetalhesClientes.style.display = "none";
  TelaDetalhesFuncionarios.style.display = "none";

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
    default:
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
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
  const titulos = ["Id", "Nome", "Celular", "Status", "Ver Detalhes"];
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
    botaoDetalhes.addEventListener("click", function () {
      MostrarTelaDetalhesCliente(item.cliId);
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
  const containerTabela = document.getElementById("tableFuncionarios");
  const tabelaExistente = containerTabela.querySelector("table");

  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }

  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = ["Id", "Nome", "Celular", "Status", "Ver Detalhes"];

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

        if (campo === "funId") {
          celula.setAttribute("data-id", item[campo]);
        }
      }
    });

    let celulaBotao = linha.insertCell();
    let botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Ver";

    botaoDetalhes.addEventListener("click", () => Detalhes(linha));

    celulaBotao.appendChild(botaoDetalhes);
  });

  document.getElementById("tableFuncionarios").appendChild(tabela);
}

function Detalhes(linha) {
  const funId = linha.querySelector("[data-id]").getAttribute("data-id");
  MostrarTelaDetalhesFuncionario(funId);
}

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId) {
  const result = await ReadClienteDetalhes(idAcademia, cliId);
  MostrarTela();
  TelaDetalhesClientes.style.display = "block";

  Object.keys(result).forEach((key) => {
    let input = formDetCliente.querySelector(`[name="${key}"]`);
    if (input) {
      if (input.type === "date") {
        let dateValue = new Date(result[key]).toISOString().split("T")[0];
        input.value = dateValue;
      } else {
        input.value = result[key];
      }
    }
  });

  btnEditarDetalhesCliente.addEventListener("click", (e) => {
    e.preventDefault();
    Object.keys(result).forEach((key) => {
      let input = formDetCliente.querySelector(`[name="${key}"]`);
      if (input) {
        input.removeAttribute("disabled");
      }
    });
    e.target.style.display = "none";
    btnEnviarDetalhesCliente.style.display = "block";
  });
}

//Função de Edição

btnEnviarDetalhesCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  const fd = new FormData(formDetCliente);
  const data = Object.fromEntries(fd.entries());
  data.cliId = cliId;
  const result = await UpdateClienteDetalhes(data);
  Object.keys(result).forEach((key) => {
    let input = formDetCliente.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetCliente.reset();
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
});

//Função de mostrar o modal

btnArchiveCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("modalArquivarCliente").style.display = "block";
});

const formArquivarCliente = document.getElementById("formArquivarCliente");

//Função de Arquivamento

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await ArchiveCliente(cliId);
  formDetCliente.reset();
  document.getElementById("modalArquivarCliente").style.display = "none";
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
});

//Mostra a Tela de Detalhes do funcionario

async function MostrarTelaDetalhesFuncionario(funId) {
  const result = await ReadFuncionarioDetalhes(idAcademia, funId);
  MostrarTela();
  TelaDetalhesFuncionarios.style.display = "block";

  Object.keys(result).forEach((key) => {
    let input = formDetFuncionario.querySelector(`[name="${key}"]`);
    if (input) {
      if (input.type === "date") {
        let dateValue = new Date(result[key]).toISOString().split("T")[0];
        input.value = dateValue;
      } else {
        input.value = result[key];
      }
    }
  });

  btnEditarDetalhesFuncionario.addEventListener("click", (e) => {
    e.preventDefault();
    Object.keys(result).forEach((key) => {
      let input = formDetFuncionario.querySelector(`[name="${key}"]`);
      if (input) {
        input.removeAttribute("disabled");
      }
    });
    e.target.style.display = "none";
    btnEnviarDetalhesFuncionario.style.display = "block";
  });
}

//Função de Edição

btnEnviarDetalhesFuncionario.addEventListener("click", async (e) => {
  e.preventDefault();
  let funId = document.getElementById("funDetId").value;
  const fd = new FormData(formDetFuncionario);
  const data = Object.fromEntries(fd.entries());

  data.funId = funId;
  const result = await UpdateFuncionarioDetalhes(data);
  Object.keys(result).forEach((key) => {
    let input = formDetFuncionario.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetFuncionario.reset();
  await UpdateListaFuncionario();
  MostrarTela("TelaFuncionarios");
});

//Função de Mostrar o Modal

btnArchiveFuncionario.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("modalArquivarFuncionario").style.display = "block";
});

const formArquivarFuncionario = document.getElementById(
  "formArquivarFuncionario"
);

//Função de arquivamento

formArquivarFuncionario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let funId = document.getElementById("funDetId").value;
  await ArchiveFuncionario(funId);
  formDetFuncionario.reset();
  document.getElementById("modalArquivarFuncionario").style.display = "none";
  await UpdateListaFuncionario();
  MostrarTela("TelaFuncionarios");
});

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("dados", "");
  window.location.href = "../index.html";
})
