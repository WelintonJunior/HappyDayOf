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
    dados = dadosFromLocalStorage.dados;
    token = dadosFromLocalStorage.token;
  } else {
    clienteServices.login.handleAcessoNegado();
  }
} catch (err) {
  clienteServices.login.handleAcessoNegado();
}

const idAcademia = dados.CliIdAcad;
const idCliente = dados.CliId;

const TEMPO_EXPIRACAO = 3600 * 1000;

const logoutInterval = setTimeout(async () => {
  const result = await clienteServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result);
    clienteServices.login.handleLogout();
  }
}, TEMPO_EXPIRACAO + 1500);

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
const btnImc = document.getElementById("btnCalculadoraImc");
const TelaFicha = document.getElementById("TelaFicha");
const TelaDesempenho = document.getElementById("TelaDesempenho");
const TelaPerfil = document.getElementById("TelaPerfil");
const TelaImc = document.getElementById("TelaImc");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");
const formSatisfacao = document.getElementById("formSatisfacao");
const rating0 = document.getElementById("rating-0");
const rating1 = document.getElementById("rating-1");
const rating2 = document.getElementById("rating-2");
const rating3 = document.getElementById("rating-3");
const rating4 = document.getElementById("rating-4");
const modalSatisfacao = document.getElementById("modalSatisfacao");
const formDetCliente = document.getElementById("formDetalhesCliente");
const fecharModalRegisterMeta = document.getElementById(
  "fecharModalRegisterMeta"
);
const modalRegisterMeta = document.getElementById("modalRegisterMeta");
const cliDetCep = document.getElementById("cliDetCep");
const reloadBtnDesempenho = document.getElementById("reloadBtnDesempenho");
const btnCadastrarMeta = document.getElementById("btnCadastrarMeta");
const formMeta = document.getElementById("formMeta");

//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

document.addEventListener("DOMContentLoaded", async function () {
  // clienteServices.VerificarSessao(token);
  clienteServices.connectWebSocket();
  const result = await clienteServices.ReadAcademia(idAcademia, token);
  document.getElementById("titleAcad").innerHTML = result.AcaNome;
  document.getElementById(
    "cliInfo"
  ).innerHTML = `Olá Aluno: ${dados.CliNome} da Academia: ${result.AcaNome}`;
  const dateNow = getFormattedDateTime();
  await UpdateStatusAtendimento(idAcademia, idCliente, dateNow);
  const StatusSatisfacao = await clienteServices.VerificarAtendimento(
    idAcademia,
    idCliente,
    token
  );
  await VerificarSatisfacaoAtendimento(
    StatusSatisfacao,
    null,
    idAcademia,
    idCliente
  );
  // clienteServices.ConnectIO();
});

async function UpdateStatusAtendimento(idAcademia, cliId, dateNow) {
  const isAtendimento = await clienteServices.ReadStatusAtendimento(
    idAcademia,
    cliId,
    dateNow,
    token
  );
  document.getElementById("isAtendimento").innerHTML = isAtendimento
    ? "<h4>Em Atendimento</h4>"
    : "";
}

async function VerificarSatisfacaoAtendimento(
  StatusSatisfacao,
  dateNow,
  idAcademia,
  cliId
) {
  if (StatusSatisfacao.SatId != 0) {
    const ateInfo = await clienteServices.ReadAtendimentoInfo(
      StatusSatisfacao.SatIdAtendimento,
      token
    );
    const satText = document.getElementById("satText");
    modalSatisfacao.style.display = "block";
    document.getElementById("satIdSatisfacao").value = StatusSatisfacao.SatId;
    const date = new Date(ateInfo.AteDateEncerramento);
    const horas =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");
    const dia =
      date.getDate().toString().padStart(2, "0") +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
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
const btnVoltarTelaCliente = document.getElementById("btnVoltarTelaCliente");

fecharModalRegisterMeta.onclick = function () {
  modalRegisterMeta.style.display = "none";
};
//Clicar Fora fecha o Modal Arquivar Cliente

window.onclick = function (event) {
  if (event.target == modalRegisterMeta) {
    modalRegisterMeta.style.display = "none";
  }
};

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
//btnCalcularImc
btnImc.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaImc", token);
});

//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await MostrarTelaCriarFicha(idCliente, token);
  await renderDesempenhoChart(idCliente, token);
  await preencherMetaExercicios(idCliente, token);
  await RenderListaMeta(token);
});

//Função para pegar os dados da api de cep e jogar nos campos

cliDetCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("cliDetCidade").value = data.localidade;
      document.getElementById("cliDetEstado").value = data.uf;
      document.getElementById("cliDetRua").value = data.logradouro;
    } else {
      alert("Cep não encontrado");
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
          if (campo === "DetStatus") {
            if (item[campo] === 0) {
              return;
            }
          }
          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.DetId);
          celula.setAttribute("data-campo", campo);
        }
      });
    }

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId, token) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "B", token);

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
        }
      });
    }

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
          if (campo === "DetStatus") {
            if (item[campo] === 0) {
              return;
            }
          }

          let celula = linha.insertCell();
          celula.innerHTML = item[campo];
          celula.setAttribute("data-detId", item.detId);
          celula.setAttribute("data-campo", campo);
        }
      });
    }

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
  const result = await clienteServices.ReadFichaDetalhesGeral(cliId, token);
  if (result.length > 0) {
    await UpdateClienteFichaTreinoA(cliId, token);
    await UpdateClienteFichaTreinoB(cliId, token);
    await UpdateClienteFichaTreinoC(cliId, token);
    const dadosCliente = await clienteServices.ReadClienteDetalhes(
      idAcademia,
      result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente,
      token
    );
    const dadosFuncionario = await clienteServices.ReadFuncionarioDetalhes(
      idAcademia,
      result.length > 0 ? result[0].FicIdFuncionario : result.FicIdFuncionario,
      token
    );
    document.getElementById("cliNomeCriarFicha").innerHTML =
      dadosCliente.CliNome;
    document.getElementById("funNomeCriarFicha").innerHTML =
      dadosFuncionario.FunNome;
    document.getElementById("funSelectCriarFicha");
    document.getElementById("cliRestricoesCriarFicha").checked =
      result.length > 0
        ? (result[0].FicRestricoes = 1)
        : (result.FicRestricoes = 1);
    if (
      result.length > 0
        ? result[0].FicRestricoes == 1
        : result.FicRestricoes == 1
    ) {
      document.getElementById("cliRestricoesTipoCriarFicha").style.display =
        "block";
      document.getElementById("cliRestricoesTipoCriarFicha").innerHTML =
        "Tipo de restrições: ";

      var textRestricao;

      console.log(result)

      if(result.length > 0) {
        if (result[0].FicTipoRestricoes == "" && result.length > 0) {
          textRestricao = "Nenhuma restrição";
        } else {
          textRestricao = result[0].FicTipoRestricoes;
        }
      } else {
        if (result.FicTipoRestricoes == "" && result.length < 0) {
          textRestricao = "Nenhuma restrição";
        } else {
          textRestricao = result.FicTipoRestricoes;
        }
      }
      document.getElementById("cliRestricoesTipoCriarFicha").innerHTML += textRestricao;
    } else {
      document.getElementById("cliRestricoesTipoCriarFicha").style.display =
        "none";
    }
    document.getElementById("cliIntervaloCriarFicha").innerHTML =
      result.length > 0 ? result[0].FicIntervalo : result.FicIntervalo;
  } else {
    mostrarModalNaoPossuiFicha();
    MostrarTela("TelaPerfil", token);
  }
}

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId, token) {
  const result = await clienteServices.ReadClienteDetalhes(
    idAcademia,
    cliId,
    token
  );
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
    alert("O CPF não pode ser vazio");
    return;
  } else if (data.cliEmail === "") {
    alert("O Email não pode ser vazio");
  }
  const result = await clienteServices.UpdateClienteDetalhes(data, token);
  var inputs = formDetCliente.querySelectorAll("input, select, textarea");
  inputs.forEach(function (input) {
    input.setAttribute("disabled", "disabled");
  });
  e.target.style.display = "none";
  btnEditarDetalhesCliente.style.display = "block";
});

//Satisfacao

formSatisfacao.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const result = await clienteServices.UpdateSatisfacao(data, token);
  modalSatisfacao.style.display = "none";
  mostrarModalObrigado();
});

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
      TelaImc.style.display = "none";
      await MostrarTelaCriarFicha(idCliente, token);
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
      btnImc.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "block";
      TelaPerfil.style.display = "none";
      TelaImc.style.display = "none";
      break;
    case "TelaPerfil":
      if (TelaPerfil.style.display === "block") {
        TelaPerfil.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      await MostrarTelaDetalhesCliente(idCliente, token);
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnImc.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "none";
      TelaImc.style.display = "none";
      TelaPerfil.style.display = "block";
      break;
    case "TelaImc":
      if (TelaImc.style.display === "block") {
        TelaImc.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnImc.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnImc.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaPerfil.style.display = "none";
      TelaDesempenho.style.display = "none";
      TelaImc.style.display = "block";
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
  document.getElementById("modalNaoPossuiFicha").style.display = "block";
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
  let exercicios = await clienteServices.ReadExerciciosForDesempenho(
    cliId,
    token
  );

  if (exercicios) {
    const boxChartDesempenho = document.getElementById("boxChartDesempenho");
    if (boxChartDesempenho.chart) {
      boxChartDesempenho.chart.destroy();
    }

    const exerciciosAgrupadosPorExercicio = {};

    exercicios.forEach((exercicio) => {
      const nomeExercicio = exercicio.DetVariacao;
      if (!exerciciosAgrupadosPorExercicio[nomeExercicio]) {
        exerciciosAgrupadosPorExercicio[nomeExercicio] = {
          label: nomeExercicio,
          data: [],
          borderColor: generateVibrantColor(),
          fill: false,
          spanGaps: true,
        };
      }
      exerciciosAgrupadosPorExercicio[nomeExercicio].data.push({
        x: new Date(exercicio.DetDataAdicionado).toLocaleDateString("pt-BR"),
        y: exercicio.DetCarga,
      });
    });

    const datasets = Object.values(exerciciosAgrupadosPorExercicio);

    const ctx = boxChartDesempenho.getContext("2d");
    boxChartDesempenho.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "time",
            display: false,
            offset: false,
            time: {
              parser: "dd/MM/yyyy",
              tooltipFormat: "dd/MM/yyyy",
              unit: "day",
              displayFormats: {
                day: "dd/MM/yyyy",
              },
              minUnit: "day",
            },
            title: {
              display: true,
              text: "Data",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Carga",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  }
}

let vibrantColors = [
  "#e6194b",
  "#000075",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#3cb44b",
  "#808080",
];

let colorIndex = 0;

function generateVibrantColor() {
  let color = vibrantColors[colorIndex];
  colorIndex = (colorIndex + 1) % vibrantColors.length;
  return color;
}

reloadBtnDesempenho.addEventListener("click", async (e) => {
  e.preventDefault();
  const boxChartDesempenho = document.getElementById("boxChartDesempenho");

  boxChartDesempenho.innerHTML = "";
  await renderDesempenhoChart(idCliente, token);
});

formMeta.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.cliId = idCliente;
  if (data.metCarga <= 0) {
    alert("Carga inválida");
    return;
  }
  await clienteServices.RegisterMeta(data, idAcademia, token);

  await RenderListaMeta(token);

  // await clienteServices.UpdateMeta(data, token)
  document.getElementById("modalRegisterMeta").style.display = "none";
  e.target.reset();
});

async function RenderListaMeta(token) {
  const result = await clienteServices.ReadMetas(idCliente, token);
  let itemsMeta = document.getElementById("itemsMeta");
  itemsMeta.innerHTML = "";

  let count = 1;

  result.forEach((item) => {
    let content = `<div class="col-1"></div><div class="itemsMeta row col-11 my-2 align-items-center">
    <input class="d-none" value="${item.MetId}" id="itemId${
      item.MetId
    }"></input>
    <div class="col-md-3">
      ${item.ExeNome}
    </div>
    <div class="col-md-2">
      Carga ${item.MetCarga}
    </div>
    <div class="col-md-5">
      <span>Cumprir Até ${new Date(item.MetDataCumprir).toLocaleDateString(
        "pt-BR"
      )}</span>
    </div>
    <div class="col-md-2">
    <button class="disabled btn btn-info">Editar</button>
  </div>
  </div>`;
    itemsMeta.innerHTML += content;
    count++;
  });
}

btnCadastrarMeta.addEventListener("click", async (e) => {
  e.preventDefault();
  const MetaAtual = await clienteServices.ReadMetaAtual(
    idCliente,
    idAcademia,
    token
  );
  if (MetaAtual.MetStatusAlterar == 1) {
    modalRegisterMeta.style.display = "none";
    mostrarModalObjetivo();
    return;
  }
  document.getElementById("modalRegisterMeta").style.display = "block";
});

async function preencherMetaExercicios(idCliente, token) {
  const result = await clienteServices.ReadExerciciosFichaCliente(
    idCliente,
    token
  );
  const exeMetaNome = document.getElementById("exeMetaNome");
  for (i = 0; i < result.length; i++) {
    exeMetaNome.innerHTML += `<option value= ${result[i].DetId}>${result[i].DetVariacao}</option>`;
  }
}

//Lotação Acad

let lotacaoAcad = document.getElementById("lotacaoAcad");

document.addEventListener("DOMContentLoaded", async () => {
  const qtd = await clienteServices.VerificarQuantidadeAtendimento();
  if (qtd <= 20) {
    lotacaoAcad.innerHTML = "Lotação pequena";
    lotacaoAcad.style.cssText =
      "text-shadow: -0.5px -0.5px 0 green, 0.5px -0.5px 0 green, -0.5px 0.5px 0 green, 0.5px 0.5px 0 green";
  } else if (qtd > 20 && qtd <= 45) {
    lotacaoAcad.innerHTML = "Lotação média";
    lotacaoAcad.style.cssText =
      "text-shadow: -0.5px -0.5px 0 yellow, 0.5px -0.5px 0 yellow, -0.5px 0.5px 0 yellow, 0.5px 0.5px 0 yellow";
  } else if (qtd > 45) {
    lotacaoAcad.innerHTML = "Lotação grande";
    lotacaoAcad.style.cssText =
      "text-shadow: -0.5px -0.5px 0 red, 0.5px -0.5px 0 red, -0.5px 0.5px 0 red, 0.5px 0.5px 0 red";
  }
});

//Calcular Imc

const formImc = document.getElementById("imc-formImc");

formImc.addEventListener("submit", function (e) {
  e.preventDefault();

  const peso = parseFloat(
    document.getElementById("imc-peso").value.replace(",", ".")
  );
  const altura = parseFloat(
    document.getElementById("imc-altura").value.replace(",", ".")
  );

  if (isNaN(peso) || isNaN(altura)) {
    alert("Por favor, insira números válidos para peso e altura.");
    return;
  }

  const imc = getImc(peso, altura);

  const valor = document.getElementById("imc-resultadoImc");
  const descricaoElement = document
    .getElementById("imc-descricao")
    .querySelector("span");
  let descricao = "";

  valor.classList.remove("imc-normal", "imc-atencao");

  if (imc < 18.5) {
    descricao = "Abaixo do Peso";
    valor.classList.add("imc-atencao");
  } else if (imc >= 18.5 && imc <= 25) {
    descricao = "Peso Normal";
    valor.classList.add("imc-normal");
  } else if (imc >= 25 && imc <= 30) {
    descricao = "Acima do Peso";
    valor.classList.add("imc-atencao");
  } else if (imc >= 30 && imc <= 35) {
    descricao = "Obesidade Grau 1";
    valor.classList.add("imc-atencao");
  } else if (imc >= 35 && imc <= 40) {
    descricao = "Obesidade Grau 2";
    valor.classList.add("imc-atencao");
  } else {
    descricao = "Obesidade Grau 3";
    valor.classList.add("imc-atencao");
  }

  function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
  }

  valor.textContent = imc.replace(".", ",");
  descricaoElement.textContent = descricao;
});
