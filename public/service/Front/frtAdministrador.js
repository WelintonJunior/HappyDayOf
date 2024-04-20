const admServices = new AdministradorServices();
let dados = [];
let token = ""
//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage.results;
    token = dadosFromLocalStorage.token;
  } else {
    admServices.login.handleAcessoNegado();
  }
} catch (err) {
  admServices.login.handleAcessoNegado();
}


//Pega o id da Academia de acordo com o usuario logado no momento
const idAcademia = dados.funIdAcad;
let tela = "";
//Declara os botoes da nav laterais
const btnResumo = document.getElementById("btnResumo");
const btnCliente = document.getElementById("btnCliente");
const btnFicha = document.getElementById("btnFicha");
const btnFuncionario = document.getElementById("btnFuncionario");

const TEMPO_EXPIRACAO = 3600 * 8000;

const logoutInterval = setTimeout(async () => {
  const result = await admServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result)
    admServices.login.handleLogout();
  }
}, (TEMPO_EXPIRACAO) + 1500);


//Dados de Boas vindas

document.addEventListener("DOMContentLoaded", async function () {
  admServices.VerificarSessao(token)
  const result = await admServices.ReadAcademia(idAcademia);
  document.getElementById("titleAcad").innerHTML = result.acaNome;
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
const btnVoltarTelaFuncionario = document.getElementById("btnVoltarTelaFuncionario");
const btnVoltarTelaCliente = document.getElementById("btnVoltarTelaCliente");
const btnVoltarTelaFicha = document.getElementById("btnVoltarTelaFicha");

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
const modalArquivarCliente = document.getElementById("modalArquivarCliente");
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
  await UpdateListaClienteFicha(token);
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
if (fecharModalCriarBaseFicha) {
  fecharModalCriarBaseFicha.onclick = function () {
    modalCriarBaseFicha.style.display = "none";
  };
}

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
    } else {
      alert("Cep não encontrado")
      e.target.value = "";
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
    } else {
      alert("Cep não encontrado")
      e.target.value = "";
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
    } else {
      alert("Cep não encontrado")
      e.target.value = "";
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
    } else {
      alert("Cep não encontrado")
      e.target.value = "";
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
    if (verificarNumeros(data.cliNome)) {
      alert("O nome não pode conter números");
      return;
    }
    data.cliDataCmc = await getFormattedDateTime();
    await admServices.RegisterCliente(data, idAcademia);
    await UpdateListaClienteFicha(token);
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
    if (verificarNumeros(data.funNome)) {
      alert("O nome não pode conter números");
      return;
    }
    data.funDataCmc = await getFormattedDateTime();
    await admServices.RegisterFuncionario(data, idAcademia);
    await UpdateListaFuncionario();
    await UpdateListaClienteFicha(token);
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
  document.getElementById("sidebarHeader").style.paddingTop = "20px"
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

//Atualizar a Lista de Clientes

async function UpdateListaCliente() {
  const result = await admServices.ReadCliente(idAcademia);
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
  if (result) {
    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "cliId",
        "cliNome",
        "cliCelular",
        "cliStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "cliStatus") {
            celula.innerHTML =
              item[campo] === "1"
                ? `<span class="text-success">Ativo</span>`
                : `<span class="text-danger">Arquivado</span>`;
          }
        }
      });
      let celulaBotao = linha.insertCell();
      celulaBotao.style.cssText = "display: flex;align-items:center; padding-left: 25px "
      let botaoDetalhes = document.createElement("button");
      botaoDetalhes.classList.add("btnVerDetalhes")
      botaoDetalhes.classList.add("btn")
      botaoDetalhes.classList.add("btn-info")
      botaoDetalhes.innerHTML = '<i class="bi bi-search"></i>';
      botaoDetalhes.addEventListener("click", function () {
        MostrarTelaDetalhesCliente(item.cliId);
      });
      celulaBotao.appendChild(botaoDetalhes);
    });
  }

  document.getElementById("tableClientes").appendChild(tabela);

  const planos = await admServices.ReadPlanos(idAcademia);
  for (i = 0; i < planos.length; i++) {
    document.getElementById(
      "cliPlano"
    ).innerHTML += `<option value=${planos[i].plaId}>${planos[i].plaNome}</option>`;
  }
}

//Atualizar a Lista de Funcionarios

async function UpdateListaFuncionario() {
  const result = await admServices.ReadFuncionario(1, idAcademia);
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
  if (result) {
    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "funId",
        "funNome",
        "funCelular",
        "funStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "funStatus") {
            celula.innerHTML =
              item[campo] === "1"
                ? `<span class="text-success">Ativo</span>`
                : `<span class="text-danger">Arquivado</span>`;
          }

          if (campo === "funId") {
            celula.setAttribute("data-id", item[campo]);
          }
        }
      });

      let celulaBotao = linha.insertCell();
      celulaBotao.style.cssText = "display: flex;align-items:center; padding-left: 25px "
      let botaoDetalhes = document.createElement("button");
      botaoDetalhes.classList.add("btnVerDetalhes")
      botaoDetalhes.classList.add("btn")
      botaoDetalhes.classList.add("btn-info")
      botaoDetalhes.innerHTML = '<i class="bi bi-search"></i>';

      botaoDetalhes.addEventListener("click", () => Detalhes(linha));

      celulaBotao.appendChild(botaoDetalhes);
    });
  }

  document.getElementById("tableFuncionarios").appendChild(tabela);
}

//Atualizar a Lista de Fichas

async function UpdateListaClienteFicha(token) {
  const result = await admServices.ReadClienteFicha(idAcademia, token);
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

  if (result) {
    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      let PossuiFicha = item.ClienteExisteNaFicha === 0 ? `<span class="text-danger">Não</span>` : `<span class="text-success">Sim</span>`;
      const camposSelecionados = ["cliId", "cliNome"];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
        }
      });

      let celulaPossuiFicha = linha.insertCell();
      celulaPossuiFicha.innerHTML = PossuiFicha;

      let celulaBotao = linha.insertCell();
      celulaBotao.style.cssText = "display: flex;align-items:center; padding-left: 25px "
      if (item.ClienteExisteNaFicha === 1) {
        let botaoDetalhes = document.createElement("button");
        botaoDetalhes.classList.add("btnVerDetalhes")
        botaoDetalhes.classList.add("btn")
        botaoDetalhes.classList.add("btn-info")
        botaoDetalhes.textContent = "Ver";
        botaoDetalhes.addEventListener("click", function () {
          MostrarTelaCriarFicha(item.cliId, token);
        });
        celulaBotao.appendChild(botaoDetalhes);
      } else {
        let botaoCriarFicha = document.createElement("button");
        botaoCriarFicha.classList.add("btnVerCriarFicha")
        botaoCriarFicha.classList.add("btn")
        botaoCriarFicha.classList.add("btn-info")
        botaoCriarFicha.textContent = "Criar";
        botaoCriarFicha.addEventListener("click", async function () {
          document.getElementById("funFicha").innerHTML = "";
          await PreencherSelectProfessores();
          modalCriarBaseFicha.style.display = "block";
          document.getElementById("cliIdFicha").value = item.cliId;
        });
        celulaBotao.appendChild(botaoCriarFicha);
      }
    });
  }

  document.getElementById("tableClientesFicha").appendChild(tabela);
}

//Atualizar a A,B e C
async function UpdateCampoFichaCliente(item, campo, celula, cliId, token) {
  if (celula.querySelector("input")) return;

  let valorAnterior = celula.textContent;

  let input = document.createElement("input");
  input.setAttribute("placeholder", item[campo]);

  input.value = valorAnterior;

  celula.innerHTML = "";
  celula.appendChild(input);

  input.focus();

  input.addEventListener("blur", async (e) => {
    let novoValor = input.value;
    const detId = celula.getAttribute("data-detid");
    const campoEditado = celula.getAttribute("data-campo");

    const data = {};
    data.detId = detId;
    data.detCampo = campoEditado;
    data.valor = novoValor;

    if (novoValor == "") {
      await admServices.DeleteCampoFicha(data, token);
      await UpdateClienteFichaTreinoA(cliId, token);
      await UpdateClienteFichaTreinoB(cliId, token);
      await UpdateClienteFichaTreinoC(cliId, token);
      if (celula.parentElement.parentElement.querySelectorAll('td').length === 1) {
        celula.parentElement.parentElement.parentElement.remove();
      }
    } else {
      await admServices.UpdateCampoFicha(data, token);
    }
    celula.textContent = novoValor;
  });
  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      let novoValor = input.value;
      const detId = celula.getAttribute("data-detid");
      const campoEditado = celula.getAttribute("data-campo");
      const data = {};
      data.detId = detId;
      data.detCampo = campoEditado;
      data.valor = novoValor;

      if (novoValor == "") {
        await admServices.DeleteCampoFicha(data, token);
        await UpdateClienteFichaTreinoA(cliId, token);
        await UpdateClienteFichaTreinoB(cliId, token);
        await UpdateClienteFichaTreinoC(cliId, token);

        if (celula.parentElement.parentElement.querySelectorAll('td').length === 4) {
          celula.parentElement.parentElement.parentElement.remove();
        }
      } else {
        await admServices.UpdateCampoFicha(data, token);
      }
      celula.textContent = novoValor;
    }
  });
}

async function UpdateClienteFichaTreinoA(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "A", token);
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
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.detId);
          celula.setAttribute("data-campo", campo);

          //Pra celular não funciona(LEMBRANDO EU MESMO) talvez mudar apenas para click
          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    });

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "B", token);
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
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.detId);
          celula.setAttribute("data-campo", campo);

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    });

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoC(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "C", token);
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
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.detId);
          celula.setAttribute("data-campo", campo);

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    });

    document.getElementById("listaTreinoC").appendChild(tabela);
  }
}

btnVoltarTelaFicha.addEventListener("click", async (e) => {
  await UpdateListaClienteFicha(token);
  MostrarTela("TelaFicha");
})

//Função de mostrar a tela de detalhes do Funcionario

function Detalhes(linha) {
  const funId = linha.querySelector("[data-id]").getAttribute("data-id");
  MostrarTelaDetalhesFuncionario(funId);
}

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId) {
  const result = await admServices.ReadClienteDetalhes(idAcademia, cliId);
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

//Função de Edição CLiente

btnEnviarDetalhesCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  const fd = new FormData(formDetCliente);
  const data = Object.fromEntries(fd.entries());
  data.cliId = cliId;
  if (verificarNumeros(data.cliNome)) {
    alert("O nome não pode conter números");
    return;
  }
  const result = await admServices.UpdateClienteDetalhes(data);
  Object.keys(result).forEach((key) => {
    let input = formDetCliente.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetCliente.reset();
  await UpdateListaClienteFicha();
  // await UpdateListaClienteFicha();
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
});

//Função de mostrar o modal Arquivar Cliente

btnArchiveCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  modalArquivarCliente.style.display = "block";
});

const formArquivarCliente = document.getElementById("formArquivarCliente");

btnVoltarTelaCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
})

//Função de Arquivamento Cliente

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await admServices.ArchiveCliente(cliId);
  formDetCliente.reset();
  modalArquivarCliente.style.display = "none";
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
});

//Mostra a Tela de Detalhes do funcionario

async function MostrarTelaDetalhesFuncionario(funId) {
  const result = await admServices.ReadFuncionarioDetalhes(idAcademia, funId);
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

//Função de Edição Funcionario

btnEnviarDetalhesFuncionario.addEventListener("click", async (e) => {
  e.preventDefault();
  let funId = document.getElementById("funDetId").value;
  const fd = new FormData(formDetFuncionario);
  const data = Object.fromEntries(fd.entries());

  data.funId = funId;
  if (verificarNumeros(data.funNome)) {
    alert("O nome não pode conter números");
    return;
  }
  const result = await admServices.UpdateFuncionarioDetalhes(data);
  Object.keys(result).forEach((key) => {
    let input = formDetFuncionario.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetFuncionario.reset();
  await UpdateListaFuncionario();
  await UpdateListaClienteFicha();
  await PreencherSelectProfessores();
  MostrarTela("TelaFuncionarios");
});

//Função de Mostrar o Modal Arquivar Cliente

btnArchiveFuncionario.addEventListener("click", (e) => {
  e.preventDefault();
  modalArquivarFuncionario.style.display = "block";
});

btnVoltarTelaFuncionario.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaFuncionario();
  MostrarTela("TelaFuncionarios");
})

//Função de arquivar o cliente

const formArquivarFuncionario = document.getElementById(
  "formArquivarFuncionario"
);

//Função de arquivamento

formArquivarFuncionario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let funId = document.getElementById("funDetId").value;
  await admServices.ArchiveFuncionario(funId);
  formDetFuncionario.reset();
  modalArquivarFuncionario.style.display = "none";
  await UpdateListaFuncionario();
  MostrarTela("TelaFuncionarios");
});

//LOGOUT

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  admServices.login.handleLogout();
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
  const result = await admServices.RegisterBaseFicha(idAcademia, data);
  await UpdateListaClienteFicha();
  document.getElementById("modalCriarBaseFicha").style.display = "none";
  MostrarTelaCriarFicha(data.ficCliId);
});

async function MostrarTelaCriarFicha(cliId, token) {
  MostrarTela();
  // document.getElementById("sidebarHeader").style.paddingTop = "100px"
  TelaCriarFicha.style.display = "block";
  await UpdateClienteFichaTreinoA(cliId, token);
  await UpdateClienteFichaTreinoB(cliId, token);
  await UpdateClienteFichaTreinoC(cliId, token);
  const result = await admServices.ReadFichaDetalhesGeral(cliId, token);
  const dadosCliente = await admServices.ReadClienteDetalhes(
    idAcademia,
    result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente
  );
  const dadosFuncionario = await admServices.ReadFuncionarioDetalhes(
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
      ? result[0].ficRestricoes = 1
      : result.ficRestricoes = 1;
  if (
    result.length > 0 ? result[0].ficRestricoes == 1 : result.ficRestricoes == 1
  ) {
    document.getElementById("cliRestricoesTipoCriarFicha").style.display =
      "block";
    document.getElementById("cliRestricoesTipoCriarFicha").innerHTML =
      "Tipo de restrições: ";
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
  const result = await admServices.ReadFuncionario(1, idAcademia);
  document.getElementById("funFicha").innerHTML = "";
  if (result.length > 0) {
    result.forEach((item) => {
      document.getElementById(
        "funFicha"
      ).innerHTML += `<option value=${item.funId}>${item.funNome}</option>`;
    });
  } else {
    alert("Você não possui funcionários cadastrados!")
  }
}

formInserirTreinoA.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoA = document.getElementById("cliIdFichaTreinoA").value;
  const idFicha = document.getElementById("idFichaTreinoA").value;
  data.detIdFicha = idFicha;
  data.detTreino = "A";
  const verificacao = await verificarForm(data);
  if (!verificacao) {
    const result = await admServices.RegisterDetalhesFicha(data, token);
    await UpdateClienteFichaTreinoA(cliIdFichaTreinoA, token);
    formInserirTreinoA.querySelector(`[name="detVariacao"]`).value = "";
    formInserirTreinoA.querySelector(`[name="detSerie"]`).value = "";
    formInserirTreinoA.querySelector(`[name="detRepeticao"]`).value = "";
    formInserirTreinoA.querySelector(`[name="detCarga"]`).value = "";
  } else {
    alert("Você precisa preencher todos os campos")
  }
});

formInserirTreinoB.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoB = document.getElementById("cliIdFichaTreinoB").value;
  const idFicha = document.getElementById("idFichaTreinoB").value;
  data.detIdFicha = idFicha;
  data.detTreino = "B";
  const result = await admServices.RegisterDetalhesFicha(data, token);
  const verificacao = await verificarForm(data);
  if (!verificacao) {
    await UpdateClienteFichaTreinoB(cliIdFichaTreinoB, token);
    formInserirTreinoB.querySelector(`[name="detVariacao"]`).value = "";
    formInserirTreinoB.querySelector(`[name="detSerie"]`).value = "";
    formInserirTreinoB.querySelector(`[name="detRepeticao"]`).value = "";
    formInserirTreinoB.querySelector(`[name="detCarga"]`).value = "";
  } else {
    alert("Você precisa preencher todos os campos")
  }
});

formInserirTreinoC.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoC = document.getElementById("cliIdFichaTreinoC").value;
  const idFicha = document.getElementById("idFichaTreinoC").value;
  data.detIdFicha = idFicha;
  data.detTreino = "C";
  const verificacao = await verificarForm(data);
  if (!verificacao) {
    const result = await admServices.RegisterDetalhesFicha(data, token);
    await UpdateClienteFichaTreinoC(cliIdFichaTreinoC, token);
    formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
  } else {
    alert("Você precisa preencher todos os campos")
  }
});
