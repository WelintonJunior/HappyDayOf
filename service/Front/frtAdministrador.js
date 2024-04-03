const ADMINISTRADOR = 1;
let dados = [];
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage;
  } else {
    alert("Acesso Negado");
    window.location.href = "../index.html";
  }
} catch (err) {
  alert("Acesso Negado");
  window.location.href = "../index.html";
}

//Pega o id da Academia de acordo com o usuario logado no momento
const idAcademia = dados.funIdAcad;
let tela = "";

//Declara os botoes da nav laterais
const btnResumo = document.getElementById("btnResumo");
const btnCliente = document.getElementById("btnCliente");
const btnFicha = document.getElementById("btnFicha");
const btnFuncionario = document.getElementById("btnFuncionario");

//Dados de Boas vindas

document.addEventListener("DOMContentLoaded", async function () {
  const result = await ReadAcademia(idAcademia);
  document.getElementById(
    "admInfo"
  ).innerHTML = `Olá Administrador: ${dados.funNome} da Academia: ${result.acaNome}`;
});

//Declara as telas que são mostradas após clicar em algum botao
const TelaResumo = document.getElementById("TelaResumo");
const TelaFicha = document.getElementById("TelaFicha");
const TelaClientes = document.getElementById("TelaClientes");
const TelaDetalhesClientes = document.getElementById("TelaDetalhesClientes");
const TelaFuncionarios = document.getElementById("TelaFuncionarios");
const TelaDetalhesFuncionarios = document.getElementById(
  "TelaDetalhesFuncionarios"
);

//Declara botoes para uso posterior
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

//Declara Formularios
const formDetCliente = document.getElementById("formDetalhesCliente");
const formDetFuncionario = document.getElementById("formDetalhesFuncionario");
const formCriarBaseFicha = document.getElementById("formCriarBaseFicha");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");

//Declara Modal
const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");
const modalCriarBaseFicha = document.getElementById("modalCriarBaseFicha");
const modalCadastrarFuncionario = document.getElementById(
  "modalCadastrarFuncionario"
);
const modalArquivarCliente = document.getElementById(
  "modalArquivarCliente"
);
const modalArquivarFuncionario = document.getElementById(
  "modalArquivarFuncionario"
);
const fecharModalCadastrarCliente = document.getElementById(
  "fecharModalCadastrarCliente"
);
const fecharModalCadastrarFuncionario = document.getElementById(
  "fecharModalCadastrarFuncionario"
);
const fecharModalCriarBaseFicha = document.getElementById(
  "fecharModalCriarBaseFicha"
);
const fecharModalArquivarCliente = document.getElementById(
  "fecharModalArquivarCliente"
);
const fecharModalArquivarFuncionario = document.getElementById(
  "fecharModalArquivarFuncionario"
);

//btnResumo
btnResumo.firstChild.parentNode.style.backgroundColor = "#FC0404";
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
  await UpdateListaClienteFicha();
  await PreencherSelectProfessores();
});

//Abrir Modal Cliente

document
  .getElementById("abrirModalRegisterCliente")
  .addEventListener("click", (e) => {
    e.preventDefault();
    modalCadastrarCliente.style.display = "block";
  });

//Fechar Modal Cadastrar Cliente

fecharModalCadastrarCliente.onclick = function () {
  modalCadastrarCliente.style.display = "none";
};

//Clicar Fora fecha o Modal Cliente

window.onclick = function (event) {
  if (event.target == modalCadastrarCliente) {
    modalCadastrarCliente.style.display = "none";
  }
};

//Fechar Modal Arquivar Cliente

fecharModalArquivarCliente.onclick = function () {
  modalArquivarCliente.style.display = "none";
};

//Clicar Fora fecha o Modal Arquivar Cliente

window.onclick = function (event) {
  if (event.target == modalArquivarCliente) {
    modalArquivarCliente.style.display = "none";
  }
};

//Fechar Modal Arquivar Funcionario

fecharModalArquivarFuncionario.onclick = function () {
  modalArquivarFuncionario.style.display = "none";
};

//Clicar Fora fecha o Modal Arquivar Funcionario

window.onclick = function (event) {
  if (event.target == modalArquivarFuncionario) {
    modalArquivarFuncionario.style.display = "none";
  }
};

//Fechar Modal Criar Base Ficha

fecharModalCriarBaseFicha.onclick = function () {
  modalCriarBaseFicha.style.display = "none";
};

//Clicar Fora fecha o Modal Criar Base Ficha

window.onclick = function (event) {
  if (event.target == modalCriarBaseFicha) {
    modalCriarBaseFicha.style.display = "none";
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

  let inputsFuncionario = formDetFuncionario.querySelectorAll(
    "input, select, textarea"
  );
  inputsFuncionario.forEach((input) => {
    input.disabled = true;
    btnEnviarDetalhesFuncionario.style.display = "none";
    btnEditarDetalhesFuncionario.style.display = "block";
  });

  TelaDetalhesClientes.style.display = "none";
  TelaDetalhesFuncionarios.style.display = "none";
  TelaCriarFicha.style.display = "none";
  document.getElementById("listaTreinoA").innerHTML = "";
  document.getElementById("listaTreinoB").innerHTML = "";
  document.getElementById("listaTreinoC").innerHTML = "";
  formDetCliente.reset();
  formDetFuncionario.reset();
  formCriarBaseFicha.reset();
  formInserirTreinoA.reset();
  formInserirTreinoB.reset();
  formInserirTreinoC.reset();
  switch (tela) {
    case "TelaResumo":
      btnResumo.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "block";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";

      break;
    case "TelaFicha":
      if (TelaFicha.style.display === "block") {
        TelaFicha.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "block";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      break;
    case "TelaClientes":
      if (TelaClientes.style.display === "block") {
        TelaClientes.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "block";
      TelaFuncionarios.style.display = "none";
      break;
    case "TelaFuncionarios":
      if (TelaFuncionarios.style.display === "block") {
        TelaFuncionarios.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#FC0404";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "block";
      break;
    default:
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
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
  const result = await ReadFuncionario(1, idAcademia);
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

async function UpdateListaClienteFicha() {
  const result = await ReadClienteFicha(idAcademia);
  //Colocar em alguma lista
  const containerTabela = document.getElementById("tableClientesFicha");
  const tabelaExistente = containerTabela.querySelector("table");
  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }
  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = ["Id", "Nome", "Possui Ficha", "Ficha"];
  titulos.forEach((texto) => {
    let th = document.createElement("th");
    th.textContent = texto;
    linhaCabecalho.appendChild(th);
  });

  const corpoTabela = tabela.appendChild(document.createElement("tbody"));

  result.forEach((item) => {
    const linha = corpoTabela.insertRow();
    let PossuiFicha = item.ClienteExisteNaFicha === 0 ? "Não" : "Sim";
    const camposSelecionados = ["cliId", "cliNome"];

    camposSelecionados.forEach((campo) => {
      if (item.hasOwnProperty(campo)) {
        let celula = linha.insertCell();
        celula.textContent = item[campo];
      }
    });

    let celulaPossuiFicha = linha.insertCell();
    celulaPossuiFicha.textContent = PossuiFicha;

    let celulaBotao = linha.insertCell();
    if (item.ClienteExisteNaFicha === 1) {
      let botaoDetalhes = document.createElement("button");
      botaoDetalhes.textContent = "Ver";
      botaoDetalhes.addEventListener("click", function () {
        MostrarTelaCriarFicha(item.cliId);
      });
      celulaBotao.appendChild(botaoDetalhes);
    } else {
      let botaoCriarFicha = document.createElement("button");
      botaoCriarFicha.textContent = "Criar";
      botaoCriarFicha.addEventListener("click", function () {
        modalCriarBaseFicha.style.display = "block";
        document.getElementById("cliIdFicha").value = item.cliId;
      });
      celulaBotao.appendChild(botaoCriarFicha);
    }
  });

  document.getElementById("tableClientesFicha").appendChild(tabela);
}

async function UpdateClienteFichaTreinoA(cliId) {
  const result = await ReadFichaDetalhes(cliId, "A");
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById("listaTreinoA");
    const tabelaExistente = containerTabela.querySelector("table");
    if (tabelaExistente) {
      containerTabela.removeChild(tabelaExistente);
    }
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");

    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    const titulos = ["Variação", "Carga", "Serie", "Repetição"];
    titulos.forEach((texto) => {
      let th = document.createElement("th");
      th.textContent = texto;
      linhaCabecalho.appendChild(th);
    });

    const corpoTabela = tabela.appendChild(document.createElement("tbody"));

    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "detVariacao",
        "detCarga",
        "detSerie",
        "detRepeticao",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
        }
      });

      //Fazer botao Editar
      // let celulaBotao = linha.insertCell();
      //   let botaoCriarFicha = document.createElement("button");
      //   botaoCriarFicha.textContent = "Criar";
      //   botaoCriarFicha.addEventListener("click", function () {
      //     document.getElementById("modalCriarBaseFicha").style.display = "block";
      //     document.getElementById("cliIdFicha").value = item.cliId
      //   });
      //   celulaBotao.appendChild(botaoCriarFicha);
    });

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId) {
  const result = await ReadFichaDetalhes(cliId, "B");
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById("listaTreinoB");
    const tabelaExistente = containerTabela.querySelector("table");
    if (tabelaExistente) {
      containerTabela.removeChild(tabelaExistente);
    }
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");

    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    const titulos = ["Variação", "Carga", "Serie", "Repetição"];
    titulos.forEach((texto) => {
      let th = document.createElement("th");
      th.textContent = texto;
      linhaCabecalho.appendChild(th);
    });

    const corpoTabela = tabela.appendChild(document.createElement("tbody"));

    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "detVariacao",
        "detCarga",
        "detSerie",
        "detRepeticao",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
        }
      });

      //Fazer botao Editar
      // let celulaBotao = linha.insertCell();
      //   let botaoCriarFicha = document.createElement("button");
      //   botaoCriarFicha.textContent = "Criar";
      //   botaoCriarFicha.addEventListener("click", function () {
      //     document.getElementById("modalCriarBaseFicha").style.display = "block";
      //     document.getElementById("cliIdFicha").value = item.cliId
      //   });
      //   celulaBotao.appendChild(botaoCriarFicha);
    });

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoC(cliId) {
  const result = await ReadFichaDetalhes(cliId, "C");
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById("listaTreinoC");
    const tabelaExistente = containerTabela.querySelector("table");
    if (tabelaExistente) {
      containerTabela.removeChild(tabelaExistente);
    }
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");

    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    const titulos = ["Variação", "Carga", "Serie", "Repetição"];
    titulos.forEach((texto) => {
      let th = document.createElement("th");
      th.textContent = texto;
      linhaCabecalho.appendChild(th);
    });

    const corpoTabela = tabela.appendChild(document.createElement("tbody"));

    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "detVariacao",
        "detCarga",
        "detSerie",
        "detRepeticao",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
        }
      });

      //Fazer botao Editar
      // let celulaBotao = linha.insertCell();
      //   let botaoCriarFicha = document.createElement("button");
      //   botaoCriarFicha.textContent = "Criar";
      //   botaoCriarFicha.addEventListener("click", function () {
      //     document.getElementById("modalCriarBaseFicha").style.display = "block";
      //     document.getElementById("cliIdFicha").value = item.cliId
      //   });
      //   celulaBotao.appendChild(botaoCriarFicha);
    });

    document.getElementById("listaTreinoC").appendChild(tabela);
  }
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
  modalArquivarCliente.style.display = "block";
});

const formArquivarCliente = document.getElementById("formArquivarCliente");

//Função de Arquivamento

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await ArchiveCliente(cliId);
  formDetCliente.reset();
  modalArquivarCliente.style.display = "none";
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
  modalArquivarFuncionario.style.display = "block";
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
  modalArquivarFuncionario.style.display = "none";
  await UpdateListaFuncionario();
  MostrarTela("TelaFuncionarios");
});

//LOGOUT

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("dados", "");
  window.location.href = "../index.html";
});

//CHECKBOX POSSUI RESTRIÇÕES

let CheckBoxRestricoes = document.getElementById("ficRestricoes");
CheckBoxRestricoes.addEventListener("change", (e) => {
  document.getElementById("ficTipoRestricoes").value = "";
  if (CheckBoxRestricoes.checked) {
    document.getElementById("ficTipoRestricoesSpan").style.display = "block";
  } else {
    document.getElementById("ficTipoRestricoesSpan").style.display = "none";
  }
});

//Form criar base da ficha (parte de cima da foto)
formCriarBaseFicha.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.ficRestricoes === "on"
    ? (data.ficRestricoes = 1)
    : (data.ficRestricoes = 0);
  const result = await RegisterBaseFicha(idAcademia, data);
  await UpdateListaClienteFicha();
  document.getElementById("modalCriarBaseFicha").style.display = "none";
  MostrarTelaCriarFicha(data.ficCliId);
});

async function MostrarTelaCriarFicha(cliId) {
  MostrarTela();
  TelaCriarFicha.style.display = "block";
  await UpdateClienteFichaTreinoA(cliId);
  await UpdateClienteFichaTreinoB(cliId);
  await UpdateClienteFichaTreinoC(cliId);
  const result = await ReadFichaDetalhesGeral(cliId);
  const dadosCliente = await ReadClienteDetalhes(
    idAcademia,
    result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente
  );
  const dadosFuncionario = await ReadFuncionarioDetalhes(
    idAcademia,
    result.length > 0 ? result[0].ficIdFuncionario : result.ficIdFuncionario
  );
  document.getElementById("idFichaTreinoA").value =
    result.length > 0 ? result[0].ficId : result.ficId;
  document.getElementById("idFichaTreinoB").value =
    result.length > 0 ? result[0].ficId : result.ficId;
  document.getElementById("idFichaTreinoC").value =
    result.length > 0 ? result[0].ficId : result.ficId;
  document.getElementById("cliIdFichaTreinoA").value =
    result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente;
  document.getElementById("cliIdFichaTreinoB").value =
    result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente;
  document.getElementById("cliIdFichaTreinoC").value =
    result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente;
  document.getElementById("cliNomeCriarFicha").innerHTML = dadosCliente.cliNome;
  document.getElementById("funNomeCriarFicha").innerHTML =
    dadosFuncionario.funNome;
  document.getElementById("funSelectCriarFicha");
  document.getElementById("cliRestricoesCriarFicha").checked =
    result.length > 0
      ? result[0].ficRestricoes == 1
      : result.ficRestricoes == 1;
  if (
    result.length > 0 ? result[0].ficRestricoes == 1 : result.ficRestricoes == 1
  ) {
    document.getElementById("cliRestricoesTipoCriarFicha").style.display =
      "block";
    document.getElementById("cliRestricoesTipoCriarFicha").innerHTML +=
      result.length > 0
        ? result[0].ficTipoRestricoes
        : result.ficTipoRestricoes;
  } else {
    document.getElementById("cliRestricoesTipoCriarFicha").style.display =
      "none";
  }
  document.getElementById("cliIntervaloCriarFicha").innerHTML =
    result.length > 0 ? result[0].ficIntervalo : result.ficIntervalo;
}

async function PreencherSelectProfessores() {
  const result = await ReadFuncionario(1, idAcademia);
  result.forEach((item) => {
    document.getElementById(
      "funFicha"
    ).innerHTML += `<option value=${item.funId}>${item.funNome}</option>`;
  });
}

formInserirTreinoA.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoA = document.getElementById("cliIdFichaTreinoA").value;
  const idFicha = document.getElementById("idFichaTreinoA").value;
  data.detIdFicha = idFicha;
  data.detTreino = "A";
  const result = await RegisterDetalhesFicha(data);
  await UpdateClienteFichaTreinoA(cliIdFichaTreinoA);
  formInserirTreinoA.querySelector(`[name="detVariacao"]`).value = "";
  formInserirTreinoA.querySelector(`[name="detSerie"]`).value = "";
  formInserirTreinoA.querySelector(`[name="detRepeticao"]`).value = "";
  formInserirTreinoA.querySelector(`[name="detCarga"]`).value = "";
});

formInserirTreinoB.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoB = document.getElementById("cliIdFichaTreinoB").value;
  const idFicha = document.getElementById("idFichaTreinoB").value;
  data.detIdFicha = idFicha;
  data.detTreino = "B";
  const result = await RegisterDetalhesFicha(data);
  await UpdateClienteFichaTreinoB(cliIdFichaTreinoB);
  formInserirTreinoB.querySelector(`[name="detVariacao"]`).value = "";
  formInserirTreinoB.querySelector(`[name="detSerie"]`).value = "";
  formInserirTreinoB.querySelector(`[name="detRepeticao"]`).value = "";
  formInserirTreinoB.querySelector(`[name="detCarga"]`).value = "";
});

formInserirTreinoC.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoC = document.getElementById("cliIdFichaTreinoC").value;
  const idFicha = document.getElementById("idFichaTreinoC").value;
  data.detIdFicha = idFicha;
  data.detTreino = "C";
  const result = await RegisterDetalhesFicha(data);
  await UpdateClienteFichaTreinoC(cliIdFichaTreinoC);
  formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
});
