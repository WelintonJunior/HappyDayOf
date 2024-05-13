const funServices = new FuncionarioServices();
let dados = [];
let token = ""
//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage.dados;
    token = dadosFromLocalStorage.token
  } else {
    funServices.login.handleAcessoNegado();
  }
} catch (err) {
  funServices.login.handleAcessoNegado();
}

const TEMPO_EXPIRACAO = 3600 * 8000;

const logoutInterval = setTimeout(async () => {
  const result = await funServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result)
    funServices.login.handleLogout();
  }
}, (TEMPO_EXPIRACAO) + 1500);

//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const idAcademia = dados.FunIdAcad;

document.addEventListener("DOMContentLoaded", async function () {
  // funServices.VerificarSessao(token)
  const result = await funServices.ReadAcademia(idAcademia, token);
  document.getElementById("titleAcad").innerHTML = result.AcaNome;
  document.getElementById(
    "funInfo"
  ).innerHTML = `Olá Funcionario: ${dados.FunNome} da Academia: ${result.AcaNome}`;
});

let tela = "";

//Declara os botoes da nav laterais
const btnAtendimento = document.getElementById("btnAtendimento");
const btnFicha = document.getElementById("btnFicha");
const btnCliente = document.getElementById("btnCliente");
const btnMeuDesempenho = document.getElementById("btnMeuDesempenho");

//Declara as telas que são mostradas após clicar em algum botao
const TelaAtendimento = document.getElementById("TelaAtendimento");
const TelaFicha = document.getElementById("TelaFicha");
const TelaClientes = document.getElementById("TelaClientes");
const TelaMeuDesempenho = document.getElementById("TelaMeuDesempenho");

const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnArchiveCliente = document.getElementById("btnArchiveCliente");
const btnAtivarCliente = document.getElementById("btnAtivarCliente");
const btnCadastrarAtendimento = document.getElementById(
  "btnCadastrarAtendimento"
);
const btnVoltarTelaCliente = document.getElementById(
  "btnVoltarTelaCliente"
);
const formDetCliente = document.getElementById("formDetalhesCliente");
const formCadastrarAtendimento = document.getElementById(
  "formCadastrarAtendimento"
);
const formCriarBaseFicha = document.getElementById("formCriarBaseFicha");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");
const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");
const modalCriarBaseFicha = document.getElementById("modalCriarBaseFicha");
const modalArquivarCliente = document.getElementById("modalArquivarCliente");
const modalCadastrarAtendimento = document.getElementById(
  "modalCadastrarAtendimento"
);
const fecharModalCadastrarAtendimento = document.getElementById(
  "fecharModalCadastrarAtendimento"
);
const fecharModalCadastrarCliente = document.getElementById(
  "fecharModalCadastrarCliente"
);
const fecharModalCriarBaseFicha = document.getElementById(
  "fecharModalCriarBaseFicha"
);
const fecharModalArquivarCliente = document.getElementById(
  "fecharModalArquivarCliente"
);
const formArquivarCliente = document.getElementById("formArquivarCliente");
let CheckBoxRestricoes = document.getElementById("ficRestricoes");

//btnResumo
btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
btnAtendimento.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaAtendimento");
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

//btnMeuDesempenho
btnMeuDesempenho.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaMeuDesempenho");
});


//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await UpdateListaCliente(token);
  await UpdateListaClienteFicha(token);
  await PreencherSelectProfessores(token);
  await PreencherSelectClienteAtendimento(token);
  await UpdateListaAtendimento(token);
  await renderMeuDesempenhoChart()
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

//Fechar Modal Cadastrar Base Ficha

fecharModalCriarBaseFicha.onclick = function () {
  modalCriarBaseFicha.style.display = "none";
};

//Clicar Fora fecha o Modal Base Ficha

window.onclick = function (event) {
  if (event.target == modalCriarBaseFicha) {
    modalCriarBaseFicha.style.display = "none";
  }
};

//Abrir Modal Atendimento

btnCadastrarAtendimento.addEventListener("click", (e) => {
  e.preventDefault();
  modalCadastrarAtendimento.style.display = "block";
});


//Fechar Modal Cadastrar Atendimento

fecharModalCadastrarAtendimento.onclick = function () {
  modalCadastrarAtendimento.style.display = "none";
};

//Clicar Fora fecha o Modal Atendimento

window.onclick = function (event) {
  if (event.target == modalCadastrarAtendimento) {
    modalCadastrarAtendimento.style.display = "none";
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

//Voltar tela CLiente 

btnVoltarTelaCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  MostrarTela("TelaClientes");
  await UpdateListaCliente(token);
})

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
    modalCadastrarCliente.style.display = "none";
    showLoading()
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (verificarNumeros(data.cliNome)) {
      alert("O nome não pode conter números");
      return;
    }
    data.cliDataCmc = await getFormattedDateTime();
    await funServices.RegisterCliente(data, idAcademia, token);
    await UpdateListaClienteFicha(token);
    await UpdateListaCliente(token);
    e.target.reset();
    hideLoading()
  });

//Atualizar a Lista de Clientes

async function UpdateListaCliente(token, filtroNome = "") {
  const result = await funServices.ReadCliente(idAcademia, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.CliNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

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
  if (resultadosFiltrados) {
    resultadosFiltrados.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "CliId",
        "CliNome",
        "CliCelular",
        "CliStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "CliStatus") {
            celula.innerHTML =
              item[campo] === 1
                ? `<span class="text-success">Ativo</span>`
                : `<span class="text-danger">Desativado</span>`;
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
        MostrarTelaDetalhesCliente(item.CliId, token);
      });
      celulaBotao.appendChild(botaoDetalhes);
    });
  }

  document.getElementById("tableClientes").appendChild(tabela);

  const planos = await funServices.ReadPlanos(idAcademia, token);
  for (i = 0; i < planos.length; i++) {
    document.getElementById(
      "cliPlano"
    ).innerHTML += `<option value=${planos[i].PlaId}>${planos[i].PlaNome}</option>`;
  }
}

//Atualizar a Lista de Atendimento

async function UpdateListaAtendimento(token, filtroNome = "") {
  const result = await funServices.ReadAtendimento(idAcademia, dados.FunId, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.CliNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

  // Colocar em alguma lista
  const containerTabela = document.getElementById("tableAtendimento");
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
    "Status",
    "Data Inicio",
    "Data Encerramento",
    "Encerrar",
  ];
  titulos.forEach((texto) => {
    let th = document.createElement("th");
    th.textContent = texto;
    linhaCabecalho.appendChild(th);
  });

  const corpoTabela = tabela.appendChild(document.createElement("tbody"));
  if (resultadosFiltrados) {
    resultadosFiltrados.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "AteId",
        "CliNome",
        "AteStatus",
        "AteDateInicio",
        "AteDateEncerramento",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          if (campo === "AteStatus") {
            let content = "";
            if (item[campo] === 1) {
              content = `<span class="text-success">Aberto</span>`;
              InserirAbaFichaCliente(item);
            } else {
              content = `<span class="text-danger">Fechado</span>`;
            }
            celula.innerHTML = content;
          } else if (
            campo === "AteDateInicio" ||
            campo === "AteDateEncerramento"
          ) {
            if (item[campo]) {
              celula.textContent = moment(item[campo]).format(
                "DD/MM/YYYY HH:mm:ss"
              );
            } else {
              celula.textContent = "";
            }
          } else {
            celula.textContent = item[campo];
          }
        }
      });

      if (item.AteStatus === 1) {
        let celulaBotao = linha.insertCell();
        let botaoEncerrar = document.createElement("button");
        celulaBotao.style.cssText = "display: flex;align-items:center; padding-left: 25px "
        botaoEncerrar.classList.add("btn")
        botaoEncerrar.classList.add("btn-danger")
        botaoEncerrar.classList.add("bi")
        botaoEncerrar.classList.add("bi-x-circle")
        botaoEncerrar.addEventListener("click", async function () {
          const data = {};
          const dateNow = getFormattedDateTime();
          data.ateId = item.AteId;
          data.dateNow = dateNow;
          data.ateIdCliente = item.AteIdCliente;
          await FecharAba(item.AteIdCliente)
          await funServices.UpdateStatusAtendimento(idAcademia, data, token);
          await UpdateListaAtendimento(token);
        });

        celulaBotao.appendChild(botaoEncerrar);
      }
    });
  }

  document.getElementById("tableAtendimento").appendChild(tabela);
}

//Atualizar a Lista de Fichas

async function UpdateListaClienteFicha(token, filtroNome = "") {
  const result = await funServices.ReadClienteFicha(idAcademia, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.CliNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

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

  if (resultadosFiltrados) {
    resultadosFiltrados.forEach((item) => {
      const linha = corpoTabela.insertRow();
      let PossuiFicha = item.ClienteExisteNaFicha === 0 ? `<span class="text-danger">Não</span>` : `<span class="text-success">Sim</span>`;
      const camposSelecionados = ["CliId", "CliNome"];

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
          MostrarTelaCriarFicha(item.CliId, token);
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
          await UpdateCriarFichaTreinoA(item.CliId, token)
          await PreencherSelectProfessores();
          modalCriarBaseFicha.style.display = "block";
          // introJs().start();
          document.getElementById("cliIdFicha").value = item.CliId;
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
    data.cliIdFicha = document.getElementById("cliIdAtual").value;
    const dateTimeString = await getFormattedDateTime();
    const dateOnly = dateTimeString.split(" ")[0];
    data.detDataAdicionado = dateOnly
    if (novoValor == "") {
      await funServices.DeleteCampoFicha(data, token);
      await UpdateClienteFichaTreinoA("listaTreinoA", cliId, token);
      await UpdateClienteFichaTreinoB("listaTreinoB", cliId, token);
      await UpdateClienteFichaTreinoC("listaTreinoC", cliId, token);
      if (celula.parentElement.parentElement.querySelectorAll('td').length === 1) {
        celula.parentElement.parentElement.parentElement.remove();
      }
    } else {
      await funServices.UpdateCampoFicha(data, token);
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
      data.cliIdFicha = document.getElementById("cliIdAtual").value;
      const dateTimeString = await getFormattedDateTime();
      const dateOnly = dateTimeString.split(" ")[0];
      data.detDataAdicionado = dateOnly
      if (novoValor == "") {
        await funServices.DeleteCampoFicha(data, token);
        await UpdateClienteFichaTreinoA("listaTreinoA", cliId, token);
        await UpdateClienteFichaTreinoB("listaTreinoB", cliId, token);
        await UpdateClienteFichaTreinoC("listaTreinoC", cliId, token);

        if (celula.parentElement.parentElement.querySelectorAll('td').length === 4) {
          celula.parentElement.parentElement.parentElement.remove();
        }
      } else {
        await funServices.UpdateCampoFicha(data, token);
      }
      celula.textContent = novoValor;
    }
  });
}

btnVoltarTelaFicha.addEventListener("click", async (e) => {
  await UpdateListaClienteFicha(token);
  MostrarTela("TelaFicha");
})


//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId, token) {
  const result = await funServices.ReadClienteDetalhes(idAcademia, cliId, token);
  await renderClienteDesempenhoChart(cliId, token, funServices)
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

  if (result.CliStatus == 1) {
    btnArchiveCliente.classList.remove("d-none")
    btnAtivarCliente.classList.add("d-none")
  } else {
    btnAtivarCliente.classList.remove("d-none")
    btnArchiveCliente.classList.add("d-none")
  }

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
  const result = await funServices.UpdateClienteDetalhes(data, token);
  Object.keys(result).forEach((key) => {
    let input = formDetCliente.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetCliente.reset();
  await UpdateListaClienteFicha(token);
  // await UpdateListaClienteFicha();
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes");
});


//Função de mostrar o modal Arquivar Cliente

btnArchiveCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  modalArquivarCliente.style.display = "block";
});

//Função de Arquivamento Cliente

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await funServices.ArchiveCliente(cliId, token);
  formDetCliente.reset();
  modalArquivarCliente.style.display = "none";
  await UpdateListaClienteFicha(token);
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes");
});

//Ativar

btnAtivarCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  let cliDetId = document.getElementById("cliDetId").value
  await funServices.AtivarCliente(cliDetId, token)
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes")
})
// btnAtivarAparelho.addEventListener("click", async (e) => {
//   e.preventDefault();
//   let apaDetId = document.getElementById("apaDetId").value
//   await funServices.AtivarAparelho(apaDetId, token)
//   await UpdateListaAparelho(token)
//   MostrarTela("TelaAparelhos")
// })
// btnAtivarExercicio.addEventListener("click", async (e) => {
//   e.preventDefault();
//   let exeDetId = document.getElementById("exeDetId").value
//   await funServices.AtivarExercicio(exeDetId, token)
//   await UpdateListaExercicio(token)
//   MostrarTela("TelaExercicios")
// })

//Reload Chart Meu Desempenho

let reloadBtnMeuDesempenho = document.getElementById("reloadBtnMeuDesempenho")
reloadBtnMeuDesempenho.addEventListener("click", async (e) => {
  e.preventDefault();
  const boxChartMeuDesempenho = document.getElementById('boxChartMeuDesempenho');
  boxChartMeuDesempenho.innerHTML = '';
  await renderMeuDesempenhoChart();
});


//LOGOUT

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  funServices.login.handleLogout();
});

//CHECKBOX POSSUI RESTRIÇÕES

CheckBoxRestricoes.addEventListener("change", (e) => {
  document.getElementById("ficTipoRestricoes").value = "";
  if (CheckBoxRestricoes.checked) {
    document.getElementById("ficTipoRestricoesSpan").style.display = "block";
  } else {
    document.getElementById("ficTipoRestricoesSpan").style.display = "none";
  }
});



//Form Cadastrar Atendimento
formCadastrarAtendimento.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const dateNow = getFormattedDateTime();
  data.dateNow = dateNow;
  data.funId = dados.FunId;
  const result = await funServices.ValidacaoAtendimento(idAcademia, data, token);
  if (result) {
    await funServices.RegisterAtendimento(idAcademia, data, token);
    await InserirAbaFichaCliente(data);
    await UpdateListaAtendimento(token);
    modalCadastrarAtendimento.style.display = "none";
  } else {
    alert("Já possui um Atendimento em aberto");
    modalCadastrarAtendimento.style.display = "none";
  }
});

//Inserir aba
const abasClientes = document.getElementById("abasClientes");
const cardBody = document.getElementById("card-body");

abasClientes.addEventListener("click", function (event) {
  if (event.target.id === "abaListaAtendimento") {
    AlterarAbaListaFicha();
  }
});


async function UpdateClienteFichaTreinoA(lista, cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "A", token);
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById(lista);
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

    for (const item of result) {
      if (item.DetStatus === 0) {
        continue;
      }
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          if (item[campo] === null) {
            celula.innerHTML = 0;
          }

          //Pra celular não funciona(LEMBRANDO EU MESMO) talvez mudar apenas para click
          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById(lista).appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(lista, cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "B", token);
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById(lista);
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


    for (const item of result) {
      if (item.DetStatus === 0) {
        continue;
      }
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          if (item[campo] === null) {
            celula.innerHTML = 0;
          }

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById(lista).appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoC(lista, cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "C", token);
  //Colocar em alguma lista
  if (result.length > 0) {
    const containerTabela = document.getElementById(lista);
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

    for (const item of result) {
      if (item.DetStatus === 0) {
        continue;
      }
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          if (item[campo] === null) {
            celula.innerHTML = 0;
          }

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById(lista).appendChild(tabela);
  }
}

async function InserirAbaFichaCliente(atendimento) {
  const result = await funServices.ReadFichaDetalhesGeral(atendimento.ateIdCliente != undefined ? atendimento.ateIdCliente : atendimento.AteIdCliente, token);
  const dadosCliente = await funServices.ReadClienteDetalhes(
    idAcademia, atendimento.AteIdCliente, token
  );

  if (result.length === 0) {
    alert(`${dadosCliente.CliNome} não possui ficha cadastrada!`)
    return
  }

  if (dadosCliente.length === 0) {
    return
  }

  if (!document.getElementById(`telaCliente${dadosCliente.CliId}`)) {
    const divCliente = document.createElement("div");
    divCliente.id = `telaCliente${dadosCliente.CliId}`;
    divCliente.className = "telaCliente";
    divCliente.style.display = "none";

    divCliente.innerHTML += `
    <div class="col-md-12">
      <div class="row flex-container">
        <!-- Treino A -->
        <div class="ficha_treino col-sm-12 col-md-4" style="padding: 2px;">
          <div id="innerA" class="inner cursor-pointer">
            <span class="pricing">
              <span>
                <strong>
                  A
                </strong>
              </span>
            </span>
            <div class="row" style="width: 100%">
              <div class="mt-2 listaTreino"  style="height: 350px" id="listaAbaTreinoA${dadosCliente.CliId}"></div>
            </div>
          </div>
        </div>

        <!-- Treino B -->
        <div class="ficha_treino col-sm-12 col-md-4" style="padding: 2px;">
          <div id="innerB" class="inner cursor-pointer">
            <span class="pricing">
              <span>
                <strong>
                  B
                </strong>
              </span>
            </span>
            <div class="row" style="width: 100%">
              <div class="mt-2 listaTreino" style="height: 350px" id="listaAbaTreinoB${dadosCliente.CliId}"></div>
            </div>
          </div>
        </div>

        <!-- Treino C -->
        <div class="ficha_treino col-sm-12 col-md-4" style="padding: 2px;">
          <div id="innerC" class="inner cursor-pointer">
            <span class="pricing">
              <span>
                <strong>
                  C
                </strong>
              </span>
            </span>
            <div class="row" style="width: 100%">
              <div class="mt-2 listaTreino" style="height: 350px" id="listaAbaTreinoC${dadosCliente.CliId}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    cardBody.appendChild(divCliente);
    if (dadosCliente.CliId != 0 && dadosCliente.CliId != null) {
      abasClientes.innerHTML += `     
    <li  class="nav-item">
      <a id="abaCliente${dadosCliente.CliId}" onclick="AlterarAbaFichaCliente(${dadosCliente.CliId})" class="nav-link" href="#">${dadosCliente.CliNome}</a>
    </li>`;
    }

  }
}


async function AlterarAbaFichaCliente(idCliente) {
  document.getElementById("ListaAtendimento").style.display = "none";
  const telasCliente = document.getElementsByClassName("telaCliente");
  for (let i = 0; i < telasCliente.length; i++) {
    telasCliente[i].style.display = "none";
  }
  await UpdateClienteFichaTreinoA(`listaAbaTreinoA${idCliente}`, idCliente, token)
  await UpdateClienteFichaTreinoB(`listaAbaTreinoB${idCliente}`, idCliente, token)
  await UpdateClienteFichaTreinoC(`listaAbaTreinoC${idCliente}`, idCliente, token)
  document.getElementById(`telaCliente${idCliente}`).style.display = "block";
  document.getElementById("abaListaAtendimento").classList.remove("active")
  const abasCliente = document.querySelectorAll('[id^="abaCliente"]');
  abasCliente.forEach(aba => {
    aba.classList.remove("active");
  });
  document.getElementById(`abaCliente${idCliente}`).classList.add("active")

}

async function AlterarAbaListaFicha() {
  document.getElementById("ListaAtendimento").style.display = "block";
  document.getElementById("abaListaAtendimento").classList.add("active");

  const telasCliente = document.getElementsByClassName("telaCliente");
  for (let i = 0; i < telasCliente.length; i++) {
    telasCliente[i].style.display = "none";
  }

  const abasCliente = document.querySelectorAll('[id^="abaCliente"]');
  abasCliente.forEach(aba => {
    aba.classList.remove("active");
  });
}


async function FecharAba(idCliente) {
  if (document.getElementById(`abaCliente${idCliente}`)) {
    document.getElementById(`abaCliente${idCliente}`).remove();
  }

  if (document.getElementById(`telaCliente${idCliente}`)) {
    document.getElementById(`telaCliente${idCliente}`).remove();
  }
}



//Form criar base da ficha (parte de cima da foto)
formCriarBaseFicha.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.ficRestricoes === "on"
    ? (data.ficRestricoes = 1)
    : (data.ficRestricoes = 0);
  const result = await funServices.RegisterBaseFicha(idAcademia, data, token);
  await UpdateListaClienteFicha(token);
  document.getElementById("modalCriarBaseFicha").style.display = "none";
  MostrarTelaCriarFicha(data.ficCliId, token);
});

async function MostrarTelaCriarFicha(cliId, token) {
  showLoading()
  MostrarTela();
  // document.getElementById("sidebarHeader").style.paddingTop = "100px"
  TelaCriarFicha.style.display = "block";
  await UpdateClienteFichaTreinoA("listaTreinoA", cliId, token);
  await UpdateClienteFichaTreinoB("listaTreinoB", cliId, token);
  await UpdateClienteFichaTreinoC("listaTreinoC", cliId, token);
  const result = await funServices.ReadFichaDetalhesGeral(cliId, token);
  const dadosCliente = await funServices.ReadClienteDetalhes(
    idAcademia, result[0].FicIdCliente, token
  );
  const dadosFuncionario = await funServices.ReadFuncionarioDetalhes(
    idAcademia, result[0].FicIdFuncionario, token
  );
  document.getElementById("idCriarFichaTreino").value =
    result.length > 0 ? result[0].FicId : result.FicId;
  document.getElementById("cliIdAtual").value =
    result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente;
  document.getElementById("cliIdFichaTreino").value =
    result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente;
  document.getElementById("cliNomeCriarFicha").innerHTML = dadosCliente.CliNome;
  document.getElementById("funNomeCriarFicha").innerHTML =
    dadosFuncionario.FunNome;
  document.getElementById("funSelectCriarFicha");
  document.getElementById("cliRestricoesCriarFicha").checked =
    result.length > 0
      ? result[0].FicRestricoes = 1
      : result.FicRestricoes = 1;
  if (
    result.length > 0 ? result[0].FicRestricoes == 1 : result.FicRestricoes == 1
  ) {
    document.getElementById("cliRestricoesTipoCriarFicha").style.display =
      "block";
    document.getElementById("cliRestricoesTipoCriarFicha").innerHTML =
      "Tipo de restrições: ";
    document.getElementById("cliRestricoesTipoCriarFicha").innerHTML +=
      result.length > 0
        ? result[0].FicTipoRestricoes
        : result.FicTipoRestricoes;
  } else {
    document.getElementById("cliRestricoesTipoCriarFicha").style.display =
      "none";
  }
  document.getElementById("cliIntervaloCriarFicha").innerHTML =
    result.length > 0 ? result[0].FicIntervalo : result.ficIntervalo;
  await PreencherBoxExercicios();
  hideLoading()
}


async function PreencherSelectProfessores(token) {
  const result = await funServices.ReadFuncionario(1, idAcademia, token);
  document.getElementById("funFicha").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "funFicha"
      ).innerHTML += `<option value=${item.FunId}>${item.FunNome}</option>`;
    });
  }
}

async function PreencherSelectClienteAtendimento(token) {
  const result = await funServices.ReadCliente(idAcademia, token);
  document.getElementById("selectClienteAtendimento").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "selectClienteAtendimento"
      ).innerHTML += `<option value=${item.CliId}>${item.CliNome}</option>`;
    });
  }
}

function MostrarTela(tela) {
  let inputsCliente = formDetCliente.querySelectorAll(
    "input, select, textarea"
  );
  inputsCliente.forEach((input) => {
    input.disabled = true;
  });
  btnEnviarDetalhesCliente.style.display = "none";
  btnEditarDetalhesCliente.style.display = "block";

  TelaDetalhesClientes.style.display = "none";
  TelaCriarFicha.style.display = "none";
  document.getElementById("listaTreinoA").innerHTML = "";
  document.getElementById("listaTreinoB").innerHTML = "";
  document.getElementById("listaTreinoC").innerHTML = "";
  formDetCliente.reset();
  formCriarBaseFicha.reset();
  switch (tela) {
    case "TelaAtendimento":
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "block";
      TelaFicha.style.display = "none";
      TelaMeuDesempenho.style.display = "none";
      TelaClientes.style.display = "none";
      break;
    case "TelaFicha":
      if (TelaFicha.style.display === "block") {
        TelaFicha.style.display = "none";
        TelaAtendimento.style.display = "block";
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "block";
      TelaMeuDesempenho.style.display = "none";
      TelaClientes.style.display = "none";
      break;
    case "TelaClientes":
      if (TelaClientes.style.display === "block") {
        TelaClientes.style.display = "none";
        TelaAtendimento.style.display = "block";
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "none";
      TelaMeuDesempenho.style.display = "none";
      TelaClientes.style.display = "block";
      break;
    case "TelaMeuDesempenho":
      if (TelaMeuDesempenho.style.display === "block") {
        TelaMeuDesempenho.style.display = "none";
        TelaAtendimento.style.display = "block";
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      TelaAtendimento.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFicha.style.display = "none";
      TelaMeuDesempenho.style.display = "block";
      break;
    default:
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnMeuDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaMeuDesempenho.style.display = "none";
      break;
  }
}

//Pesquisar Ficha

let pesquisarFicha = document.getElementById("pesquisarFicha")
pesquisarFicha.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaClienteFicha(token, nomePesquisa);
})

//Pesquisar Cliente

let pesquisarCliente = document.getElementById("pesquisarCliente")
pesquisarCliente.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaCliente(token, nomePesquisa);
})

//Pesquisar Atendimento

let pesquisarAtendimento = document.getElementById("pesquisarAtendimento")
pesquisarAtendimento.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaAtendimento(token, nomePesquisa);
})

//Criar Ficha

const innerA = document.getElementById("innerA");
const innerB = document.getElementById("innerB");
const innerC = document.getElementById("innerC");
let auxInner = "";

function ZerarAuxIneer() {
  innerA.style.border = "none"
  innerB.style.border = "none"
  innerC.style.border = "none"
  auxInner = "";
}

innerA.addEventListener('click', (e) => {
  ZerarAuxIneer();
  auxInner = "A"
  innerA.style.border = "1px solid black"

})
innerB.addEventListener('click', (e) => {
  ZerarAuxIneer();
  auxInner = "B"
  innerB.style.border = "1px solid black"

})
innerC.addEventListener('click', (e) => {
  ZerarAuxIneer();
  auxInner = "C"
  innerC.style.border = "1px solid black"

})

async function PreencherBoxExercicios() {
  const result = await funServices.ReadExercicio(idAcademia, token);
  let BoxExerciciosFicha = document.getElementById("BoxExerciciosFicha");
  ZerarAuxIneer()
  BoxExerciciosFicha.innerHTML = ""

  result.forEach((item) => {
    if (item.ExeStatus === 1) {
      let exercicioDiv = document.createElement("div");
      exercicioDiv.id = `itemExercicio${item.ExeId}`;
      exercicioDiv.className = "itemExercicioCriarFicha cursor-pointer";
      exercicioDiv.style.width = "30%"
      exercicioDiv.textContent = item.ExeNome;
      exercicioDiv.addEventListener("click", () => handleClick(item));
      BoxExerciciosFicha.appendChild(exercicioDiv);
    }
  });

}

async function handleClick(item) {
  if (auxInner === "") {
    alert("Você precisa selecionar um tipo!")
    return
  } else {
    let data = {
      detIdFicha: 0,
      detTreino: 0,
      cliIdFicha: 0,
      detVariacao: 0,
      detCarga: 0,
      detSerie: 0,
      detRepeticao: 0,
      detDataAdicionado: ""
    };
    const cliIdFichaTreino = document.getElementById("cliIdFichaTreino").value;
    const idFicha = document.getElementById("idCriarFichaTreino").value;

    const dateTimeString = await getFormattedDateTime();
    const dateOnly = dateTimeString.split(" ")[0]; // Pega apenas a parte da data
    data.detDataAdicionado = dateOnly

    switch (auxInner) {
      case "A":
        data.detIdFicha = idFicha;
        data.detTreino = "A";
        data.cliIdFicha = document.getElementById("cliIdAtual").value;
        data.detVariacao = item.ExeNome
        data.detCarga = 0
        data.detSerie = 0
        data.detRepeticao = 0
        await funServices.RegisterDetalhesFicha(data, token);
        await UpdateCriarFichaTreinoA(cliIdFichaTreino, token);
        break;
      case "B":
        data.detIdFicha = idFicha;
        data.detTreino = "B";
        data.cliIdFicha = document.getElementById("cliIdAtual").value;
        data.detVariacao = item.ExeNome
        data.detCarga = 0
        data.detSerie = 0
        data.detRepeticao = 0
        await funServices.RegisterDetalhesFicha(data, token);
        await UpdateCriarFichaTreinoB(cliIdFichaTreino, token);
        break;
      case "C":
        data.detIdFicha = idFicha;
        data.detTreino = "C";
        data.cliIdFicha = document.getElementById("cliIdAtual").value;
        data.detVariacao = item.ExeNome
        data.detCarga = 0
        data.detSerie = 0
        data.detRepeticao = 0
        await funServices.RegisterDetalhesFicha(data, token);
        await UpdateCriarFichaTreinoC(cliIdFichaTreino, token);
        break;
    }
  }
}

async function UpdateCriarFichaTreinoA(cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "A", token);
  //Colocar em alguma lista
  if (result) {
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


    for (const item of result) {
      // Pular inserção se DetStatus for 0
      if (item.DetStatus === 0) {
        continue;
      }
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          //Pra celular não funciona(LEMBRANDO EU MESMO) talvez mudar apenas para click
          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateCriarFichaTreinoB(cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "B", token);
  //Colocar em alguma lista
  if (result) {
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


    for (const item of result) {
      // Pular inserção se DetStatus for 0
      if (item.DetStatus === 0) {
        continue;
      }
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          //Pra celular não funciona(LEMBRANDO EU MESMO) talvez mudar apenas para click
          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}
async function UpdateCriarFichaTreinoC(cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "C", token);
  //Colocar em alguma lista
  if (result) {
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

    for (const item of result) {
      // Pular inserção se DetStatus for 0
      if (item.DetStatus === 0) {
        continue;
      }

      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "DetVariacao",
        "DetCarga",
        "DetSerie",
        "DetRepeticao",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);

          //Pra celular não funciona(LEMBRANDO EU MESMO) talvez mudar apenas para click
          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
        }
      });
    };

    document.getElementById("listaTreinoC").appendChild(tabela);
  }
}

function showLoading() {
  document.getElementById('loadingOverlay').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}