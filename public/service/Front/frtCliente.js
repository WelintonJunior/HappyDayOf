//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const clienteServices = new ClienteServices();
let dados = [];
let token = "";
let tela = "";

//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage.results;
    token = dadosFromLocalStorage.token;
  } else {
    clienteServices.login.handleAcessoNegado();
  }
} catch (err) {
  clienteServices.login.handleAcessoNegado();
}

const idAcademia = dados.cliIdAcad;

const TEMPO_EXPIRACAO = 3600 * 1000;

const logoutInterval = setTimeout(async () => {
  const result = await clienteServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result)
    clienteServices.login.handleLogout();
  }
}, (TEMPO_EXPIRACAO) + 1500);


//Algo parecido com isso para implementar refresh tokens
// const TEMPO_EXPIRACAO = 3600 * 1000; // 1 hora
// const INTERVALO_VERIFICACAO = 5 * 60 * 1000; // 5 minutos

// // Função para verificar e renovar o token
// const verificarERenovarToken = async () => {
//   try {
//     const result = await clienteServices.VerificarSessao(token);
//     if (result === "Sessão expirada faça login novamente") {
//       // Tentar renovar o token com refresh token
//       const novoToken = await clienteServices.renovarToken(refreshToken);
//       if (novoToken) {
//         token = novoToken; // Atualizar o token de acesso
//       } else {
//         alert("Sessão expirada. Por favor, faça login novamente.");
//         clienteServices.login.handleLogout();
//       }
//     }
//   } catch (error) {
//     console.error("Erro ao verificar ou renovar o token", error);
//   }
// };

// // Configurar intervalo para verificar o token
// setInterval(verificarERenovarToken, INTERVALO_VERIFICACAO);

// // Configurar timeout para eventual logout se algo falhar
// setTimeout(() => {
//   alert("Sessão expirada. Por favor, faça login novamente.");
//   clienteServices.login.handleLogout();
// }, TEMPO_EXPIRACAO + 1500);

const btnFicha = document.getElementById("btnFicha");
const btnDesempenho = document.getElementById("btnDesempenho");
const btnPerfil = document.getElementById("btnPerfil");
const TelaFicha = document.getElementById("TelaFicha");
const TelaDesempenho = document.getElementById("TelaDesempenho");
const TelaPerfil = document.getElementById("TelaPerfil");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");
const formSatisfacao = document.getElementById("formSatisfacao");
const rating0 = document.getElementById("rating-0");
const rating1 = document.getElementById("rating-1");
const rating2 = document.getElementById("rating-2");
const rating3 = document.getElementById("rating-3");
const rating4 = document.getElementById("rating-4");
const titleConhecimento = document.getElementById("titleConhecimento")
const modalSatisfacao = document.getElementById("modalSatisfacao")
const formDetCliente = document.getElementById("formDetalhesCliente")
const fecharModalRegisterMeta = document.getElementById("fecharModalRegisterMeta")
const modalRegisterMeta = document.getElementById("modalRegisterMeta")
const cliDetCep = document.getElementById("cliDetCep");
const reloadBtnDesempenho = document.getElementById("reloadBtnDesempenho")
const btnCadastrarMeta = document.getElementById("btnCadastrarMeta")
const formMeta = document.getElementById("formMeta")

//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

document.addEventListener("DOMContentLoaded", async function () {
  clienteServices.VerificarSessao(token);
  const result = await clienteServices.ReadAcademia(idAcademia, token);
  document.getElementById("titleAcad").innerHTML = result.acaNome;
  document.getElementById(
    "cliInfo"
  ).innerHTML = `Olá Cliente: ${dados.cliNome} da Academia: ${result.acaNome}`;
  const dateNow = getFormattedDateTime();
  await UpdateStatusAtendimento(idAcademia, dados.cliId, dateNow)
  const StatusSatisfacao = await clienteServices.VerificarAtendimento(idAcademia, dados.cliId, token)
  await VerificarSatisfacaoAtendimento(StatusSatisfacao, null, idAcademia, dados.cliId, token)
  clienteServices.ConnectIO();
});

async function UpdateStatusAtendimento(idAcademia, cliId, dateNow) {
  const isAtendimento = await clienteServices.ReadStatusAtendimento(idAcademia, cliId, dateNow, token)
  document.getElementById("isAtendimento").innerHTML = isAtendimento ? "<h4>Em Atendimento</h4>" : "";
}

async function VerificarSatisfacaoAtendimento(StatusSatisfacao, dateNow, idAcademia, cliId, token) {
  if (StatusSatisfacao[0]) {
    const ateInfo = await clienteServices.ReadAtendimentoInfo(StatusSatisfacao[0].satIdAtendimento, token)
    const satText = document.getElementById("satText");
    modalSatisfacao.style.display = "block"
    document.getElementById("satIdSatisfacao").value = StatusSatisfacao[0].satId
    const date = new Date(ateInfo[0].ateDateEncerramento);
    const horas = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0') + '/' +
      (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
      date.getFullYear();
    satText.innerHTML = `Atendimento que se encerrou às ${horas} do dia ${dia}`;
  } else if (StatusSatisfacao) {
    const ateInfo = await clienteServices.ReadAtendimentoInfo(StatusSatisfacao.data.ateId, token)
    const satText = document.getElementById("satText");
    modalSatisfacao.style.display = "block"
    document.getElementById("satIdSatisfacao").value = StatusSatisfacao[0].satId
    const date = new Date(ateInfo[0].ateDateEncerramento);
    const horas = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0') + '/' +
      (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
      date.getFullYear();
    satText.innerHTML = `Atendimento que se encerrou às ${horas} do dia ${dia}`;
  }
}

const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnVoltarTelaCliente = document.getElementById(
  "btnVoltarTelaCliente"
);

fecharModalRegisterMeta.onclick = function () {
  modalRegisterMeta.style.display = "none";
};
//Clicar Fora fecha o Modal Arquivar Cliente

window.onclick = function (event) {
  if (event.target == modalRegisterMeta) {
    modalRegisterMeta.style.display = "none";
  }
}

//btnFicha
btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
btnFicha.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaFicha", token);
});
//btnDesempenho
btnDesempenho.addEventListener("click", async (e) => {
  e.preventDefault();
  MostrarTela("TelaDesempenho", token);
});
//btnPerfil
btnPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaPerfil", token);
});

//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await MostrarTelaCriarFicha(dados.cliId, token)
  await renderDesempenhoChart(dados.cliId, token)
});

//Função para pegar os dados da api de cep e jogar nos campos

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

async function UpdateClienteFichaTreinoA(cliId, token) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "A", token);
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
        }
      });
    });

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId, token) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "B", token);
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

        }
      });
    });

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoC(cliId, token) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "C", token);
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

        }
      });
    });

    document.getElementById("listaTreinoC").appendChild(tabela);
  }
}

//LOGOUT

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  clienteServices.login.handleLogout();
});

async function MostrarTelaCriarFicha(cliId, token) {
  MostrarTela("", token);
  await UpdateClienteFichaTreinoA(cliId, token);
  await UpdateClienteFichaTreinoB(cliId, token);
  await UpdateClienteFichaTreinoC(cliId, token);
  const result = await clienteServices.ReadFichaDetalhesGeral(cliId, token);
  if (result) {
    const dadosCliente = await clienteServices.ReadClienteDetalhes(
      idAcademia,
      result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente, token
    );
    const dadosFuncionario = await clienteServices.ReadFuncionarioDetalhes(
      idAcademia,
      result.length > 0 ? result[0].ficIdFuncionario : result.ficIdFuncionario, token
    );
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
  } else {
    mostrarModalNaoPossuiFicha();
    MostrarTela("TelaPerfil", token)
  }
}

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId, token) {
  const result = await clienteServices.ReadClienteDetalhes(idAcademia, cliId, token);
  MostrarTela("TelaPerfil", token);

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
  if (data.cliCpf === "") {
    alert("O CPF não pode ser vazio")
    return
  } else if (data.cliEmail === "") {
    alert("O Email não pode ser vazio")
  }
  const result = await clienteServices.UpdateClienteDetalhes(data, token);
  var inputs = formDetCliente.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.setAttribute('disabled', 'disabled');
  });
  e.target.style.display = "none";
  btnEditarDetalhesCliente.style.display = "block";
});

//Satisfacao

formSatisfacao.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  switch (titleConhecimento.innerHTML) {
    case "Conhecimento":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data, token)
      titleConhecimento.innerHTML = "Clareza"
      break;
    case "Clareza":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data, token);
      titleConhecimento.innerHTML = "Pró Atividade"
      break;
    case "Pró Atividade":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data, token);
      titleConhecimento.innerHTML = "Disponibilidade"
      break;
    case "Disponibilidade":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data, token);
      titleConhecimento.innerHTML = "Segurança"
      break;
    case "Segurança":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data, token);
      modalSatisfacao.style.display = "none"
      titleConhecimento.innerHTML = "Conhecimento"
      mostrarModalObrigado();
      break;
  }
})


async function MostrarTela(tela, token) {
  // document.getElementById("listaTreinoA").innerHTML = "";
  // document.getElementById("listaTreinoB").innerHTML = "";
  // document.getElementById("listaTreinoC").innerHTML = "";
  switch (tela) {
    case "TelaFicha":
      btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "block";
      TelaDesempenho.style.display = "none";
      TelaPerfil.style.display = "none";
      await MostrarTelaCriarFicha(dados.cliId, token)
      break;
    case "TelaDesempenho":
      if (TelaDesempenho.style.display === "block") {
        TelaDesempenho.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "block";
      TelaPerfil.style.display = "none";
      break;
    case "TelaPerfil":
      if (TelaPerfil.style.display === "block") {
        TelaPerfil.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      await MostrarTelaDetalhesCliente(dados.cliId, token);
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "none";
      TelaPerfil.style.display = "block";
      break;
    default:
      btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaDesempenho.style.display = "none";
      TelaDesempenho.style.display = "none";
      TelaPerfil.style.display = "none";
      break;
  }
}

function mostrarModalNaoPossuiFicha() {
  document.getElementById("modalNaoPossuiFicha").style.display = "block"
  setTimeout(() => {
    document.getElementById("modalNaoPossuiFicha").style.display = "none";
  }, 3000);
}

function mostrarModalObrigado() {
  document.getElementById("modalObrigado").style.display = "block";
  setTimeout(() => {
    document.getElementById("modalObrigado").style.display = "none";
  }, 1000);
}

function mostrarModalObjetivo() {
  document.getElementById("modalObjetivo").style.display = "block";
  setTimeout(() => {
    document.getElementById("modalObjetivo").style.display = "none";
  }, 2000);
}


async function renderDesempenhoChart(cliId, token) {
  const desempenhos = await clienteServices.ReadDesempenho(cliId, token);
  if (desempenhos) {
    const meta = await clienteServices.ReadMeta(cliId, token)
    btnCadastrarMeta.innerHTML = "Cadastrar Meta"
    if (meta) {
      const data = new Date(meta.metDataCumprir);
      const dia = data.getDate();
      const mes = data.toLocaleString('default', { month: 'short' });
      const ano = data.toLocaleString('default', { year: 'numeric' });
      const dataFormatada = `${dia} ${mes} de ${ano}`;
      document.getElementById("metaASerCumprida").innerHTML = `Meta deve ser cumprida até: ${dataFormatada}`
      btnCadastrarMeta.innerHTML = "Alterar Meta"
    }

    const modulo = btnCadastrarMeta.innerHTML;
    if (modulo === "Cadastrar Meta") {
      document.getElementById("txtModalMeta").innerHTML = "Criar Meta"
    } else {
      document.getElementById("txtModalMeta").innerHTML = "Alterar Meta"
    }

    const boxChartDesempenho = document.getElementById('boxChartDesempenho');

    if (boxChartDesempenho.chart) {
      boxChartDesempenho.chart.destroy();
    }

    const labels = [];
    const pesos = [];
    const gorduras = [];

    for (let i = 0; i < desempenhos.length; i++) {
      const data = new Date(desempenhos[i].desData);
      const dia = data.getDate();
      const mes = data.toLocaleString('default', { month: 'short' });
      const ano = data.toLocaleString('default', { year: '2-digit' });
      const dataFormatada = `${dia} ${mes} ${ano}`;
      labels.push(dataFormatada);
      pesos.push(desempenhos[i].desPeso);
      gorduras.push(desempenhos[i].desGordura);
    }

    const ctx = boxChartDesempenho.getContext('2d');
    if (meta) {
      boxChartDesempenho.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Peso',
            data: pesos,
            fill: false,
            borderColor: '#e6194b',
            tension: 0.1
          }, {
            label: 'Gordura (%)',
            data: gorduras,
            fill: false,
            borderColor: '#3cb44b',
            tension: 0.1
          }
            , {
            label: 'Meta de Peso',
            data: Array(labels.length).fill(meta.metPeso),
            fill: false,
            borderColor: '#e6194b',
            borderDash: [5, 5],
            tension: 0
          }, {
            label: 'Meta de Gordura (%)',
            data: Array(labels.length).fill(meta.metGordura),
            fill: false,
            borderColor: '#3cb44b',
            borderDash: [5, 5],
            tension: 0
          }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }

      });
    } else {
      boxChartDesempenho.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Peso',
            data: pesos,
            fill: false,
            borderColor: '#e6194b',
            tension: 0.1
          }, {
            label: 'Gordura (%)',
            data: gorduras,
            fill: false,
            borderColor: '#3cb44b',
            tension: 0.1
          }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }

      });
    }

  }
}

formMeta.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  data.cliId = dados.cliId
  const modulo = btnCadastrarMeta.innerHTML;
  if (modulo === "Cadastrar Meta") {
    document.getElementById("txtModalMeta").innerHTML = "Criar Meta"
    const result = await clienteServices.RegisterMeta(data, idAcademia, token)
  } else {
    const MetaAtual = await clienteServices.ReadMetaAtual(data.cliId, idAcademia, token)
    document.getElementById("txtModalMeta").innerHTML = "Alterar Meta"
    document.getElementById("modalAvisoMeta").style.display = "block"
    document.getElementById("btnAvisoSim").addEventListener("click", async (e) => {
      e.preventDefault();
      data.idMetaAtual = MetaAtual[0].metId
      await clienteServices.UpdateMeta(data, token)
      await renderDesempenhoChart(dados.cliId, token);
      document.getElementById("modalAvisoMeta").style.display = "none"
    })
    document.getElementById("btnAvisoNao").addEventListener("click", async (e) => {
      e.preventDefault();
      document.getElementById("modalAvisoMeta").style.display = "none"
    })
  }
  await renderDesempenhoChart(dados.cliId, token);
  document.getElementById("modalRegisterMeta").style.display = "none"
  e.target.reset();
})

reloadBtnDesempenho.addEventListener("click", async (e) => {
  e.preventDefault();
  const boxChartDesempenho = document.getElementById('boxChartDesempenho');

  boxChartDesempenho.innerHTML = '';
  await renderDesempenhoChart(dados.cliId, token);
});

btnCadastrarMeta.addEventListener("click", async (e) => {
  e.preventDefault();
  const MetaAtual = await clienteServices.ReadMetaAtual(dados.cliId, idAcademia, token)
  if (MetaAtual[0].metStatusAlterar == 1) {
    modalRegisterMeta.style.display = "none"
    mostrarModalObjetivo();
    return
  }
  document.getElementById("modalRegisterMeta").style.display = "block"
})




