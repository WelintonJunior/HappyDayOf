//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const clienteServices = new ClienteServices();
let dados = [];
let token = "";
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
//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento


document.addEventListener("DOMContentLoaded", async function () {
  const result = await clienteServices.ReadAcademia(idAcademia);
  document.getElementById("titleAcad").innerHTML = result.acaNome;
  document.getElementById(
    "cliInfo"
  ).innerHTML = `Olá Cliente: ${dados.cliNome} da Academia: ${result.acaNome}`;
  const dateNow = getFormattedDateTime();
  await UpdateStatusAtendimento(idAcademia, dados.cliId, dateNow)
  const StatusSatisfacao = await clienteServices.VerificarAtendimento(idAcademia, dados.cliId)
  await VerificarSatisfacaoAtendimento(StatusSatisfacao, null, idAcademia, dados.cliId)
  clienteServices.ConnectIO();
});

async function UpdateStatusAtendimento(idAcademia, cliId, dateNow) {
  const isAtendimento = await clienteServices.ReadStatusAtendimento(idAcademia, cliId, dateNow)
  document.getElementById("isAtendimento").innerHTML = isAtendimento ? "<h4>Em Atendimento</h4>" : "";
}

let modalSatisfacao = document.getElementById("modalSatisfacao")

async function VerificarSatisfacaoAtendimento(StatusSatisfacao, dateNow, idAcademia, cliId) {
  if (StatusSatisfacao[0]) {
    const ateInfo = await clienteServices.ReadAtendimentoInfo(StatusSatisfacao[0].satIdAtendimento)
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
    const ateInfo = await clienteServices.ReadAtendimentoInfo(StatusSatisfacao.data.ateId)
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


let tela = "";

//Declara os botoes da nav laterais
const btnFicha = document.getElementById("btnFicha");
const btnDesempenho = document.getElementById("btnDesempenho");
const btnPerfil = document.getElementById("btnPerfil");


//Declara as telas que são mostradas após clicar em algum botao
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

const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnVoltarTelaCliente = document.getElementById(
  "btnVoltarTelaCliente"
);

const formDetCliente = document.getElementById("formDetalhesCliente")

//btnFicha
btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
btnFicha.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaFicha");
});
//btnDesempenho
btnDesempenho.addEventListener("click", async (e) => {
  e.preventDefault();
  MostrarTela("TelaDesempenho");
});
//btnPerfil
btnPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaPerfil");
});

//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await MostrarTelaCriarFicha(dados.cliId, token)
});

//Função para pegar os dados da api de cep e jogar nos campos

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
      await clienteServices.DeleteCampoFicha(data, token);
      await UpdateClienteFichaTreinoA(cliId, token);
      await UpdateClienteFichaTreinoB(cliId, token);
      await UpdateClienteFichaTreinoC(cliId, token);
      // Após a exclusão, verifique se não há mais campos na tabela
      if (celula.parentElement.parentElement.querySelectorAll('td').length === 1) {
        // Se não houver mais campos, remova a tabela
        celula.parentElement.parentElement.parentElement.remove();
      }
    } else {
      await clienteServices.UpdateCampoFicha(data, token);
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
        await clienteServices.DeleteCampoFicha(data, token);
        await UpdateClienteFichaTreinoA(cliId, token);
        await UpdateClienteFichaTreinoB(cliId, token);
        await UpdateClienteFichaTreinoC(cliId, token);
        // Após a exclusão, verifique se não há mais campos na tabela
        if (celula.parentElement.parentElement.querySelectorAll('td').length === 4) {
          // Se não houver mais campos, remova a tabela
          celula.parentElement.parentElement.parentElement.remove();
        }
      } else {
        await clienteServices.UpdateCampoFicha(data, token);
      }
      celula.textContent = novoValor;
    }
  });
}

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

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula, cliId, token);
          });
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
  MostrarTela();
  await UpdateClienteFichaTreinoA(cliId, token);
  await UpdateClienteFichaTreinoB(cliId, token);
  await UpdateClienteFichaTreinoC(cliId, token);
  const result = await clienteServices.ReadFichaDetalhesGeral(cliId, token);
  if (result) {
    const dadosCliente = await clienteServices.ReadClienteDetalhes(
      idAcademia,
      result.length > 0 ? result[0].ficIdCliente : result.ficIdCliente
    );
    const dadosFuncionario = await clienteServices.ReadFuncionarioDetalhes(
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
  } else {
    mostrarModalNaoPossuiFicha();
    MostrarTela("TelaPerfil")
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
  const result = await clienteServices.RegisterDetalhesFicha(data, token);
  await UpdateClienteFichaTreinoA(cliIdFichaTreinoA, token);
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
  const result = await clienteServices.RegisterDetalhesFicha(data, token);
  await UpdateClienteFichaTreinoB(cliIdFichaTreinoB, token);
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
  const result = await clienteServices.RegisterDetalhesFicha(data, token);
  await UpdateClienteFichaTreinoC(cliIdFichaTreinoC, token);
  formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
});

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId) {
  const result = await clienteServices.ReadClienteDetalhes(idAcademia, cliId);
  MostrarTela("TelaPerfil");

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
  const result = await clienteServices.UpdateClienteDetalhes(data);
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
      await clienteServices.UpdateSatisfacao(data)
      titleConhecimento.innerHTML = "Clareza"
      break;
    case "Clareza":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data);
      titleConhecimento.innerHTML = "Pró Atividade"
      break;
    case "Pró Atividade":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data);
      titleConhecimento.innerHTML = "Disponibilidade"
      break;
    case "Disponibilidade":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data);
      titleConhecimento.innerHTML = "Segurança"
      break;
    case "Segurança":
      data.modulo = titleConhecimento.innerHTML
      await clienteServices.UpdateSatisfacao(data);
      modalSatisfacao.style.display = "none"
      titleConhecimento.innerHTML = "Conhecimento"
      mostrarModalObrigado();
      break;
  }
})


async function MostrarTela(tela) {
  // document.getElementById("listaTreinoA").innerHTML = "";
  // document.getElementById("listaTreinoB").innerHTML = "";
  // document.getElementById("listaTreinoC").innerHTML = "";
  formInserirTreinoA.reset();
  formInserirTreinoB.reset();
  formInserirTreinoC.reset();
  switch (tela) {
    case "TelaFicha":
      btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "block";
      TelaDesempenho.style.display = "none";
      TelaPerfil.style.display = "none";
      await MostrarTelaCriarFicha(dados.cliId)
      break;
    case "TelaDesempenho":
      if (TelaDesempenho.style.display === "block") {
        TelaDesempenho.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "block";
      TelaPerfil.style.display = "none";
      break;
    case "TelaPerfil":
      if (TelaPerfil.style.display === "block") {
        TelaPerfil.style.display = "none";
        TelaFicha.style.display = "block";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnPerfil.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      await MostrarTelaDetalhesCliente(dados.cliId);
      btnPerfil.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnDesempenho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaFicha.style.display = "none";
      TelaDesempenho.style.display = "none";
      TelaPerfil.style.display = "block";
      break;
    default:
      btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
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