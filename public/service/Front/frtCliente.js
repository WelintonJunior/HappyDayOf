//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const clienteServices = new ClienteServices();
let dados = [];
//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage;
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
});

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
  await MostrarTelaCriarFicha(dados.cliId)
});

//Atualizar a A,B e C


async function UpdateCampoFichaCliente(item, campo, celula) {
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

    if (novoValor === "") {
      celula.textContent = valorAnterior;
    } else {
      const data = {};
      data.detId = detId;
      data.detCampo = campoEditado;
      data.valor = novoValor;
      await clienteServices.UpdateCampoFicha(data);
    }
    celula.textContent = novoValor;
  });
  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      let novoValor = input.value;
      const detId = celula.getAttribute("data-detid");
      const campoEditado = celula.getAttribute("data-campo");

      if (novoValor === "") {
        celula.textContent = valorAnterior;
      } else {
        const data = {};
        data.detId = detId;
        data.detCampo = campoEditado;
        data.valor = novoValor;
        await clienteServices.UpdateCampoFicha(data);
      }
      celula.textContent = novoValor;
    }
  });
}

async function UpdateClienteFichaTreinoA(cliId) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "A");
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
          celula.setAttribute("data-campo", campo); // Adiciona um atributo data-campo com o nome do campo

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula);
          });
        }
      });
    });

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "B");
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
          celula.setAttribute("data-campo", campo); // Adiciona um atributo data-campo com o nome do campo

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula);
          });
        }
      });
    });

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoC(cliId) {
  const result = await clienteServices.ReadFichaDetalhes(cliId, "C");
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
          celula.setAttribute("data-campo", campo); // Adiciona um atributo data-campo com o nome do campo

          celula.addEventListener("click", async (e) => {
            await UpdateCampoFichaCliente(item, campo, celula);
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

async function MostrarTelaCriarFicha(cliId) {
  MostrarTela();
  await UpdateClienteFichaTreinoA(cliId);
  await UpdateClienteFichaTreinoB(cliId);
  await UpdateClienteFichaTreinoC(cliId);
  const result = await clienteServices.ReadFichaDetalhesGeral(cliId);
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
      ? result[0].ficRestricoes == 1
      : result.ficRestricoes == 1;
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


formInserirTreinoA.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoA = document.getElementById("cliIdFichaTreinoA").value;
  const idFicha = document.getElementById("idFichaTreinoA").value;
  data.detIdFicha = idFicha;
  data.detTreino = "A";
  const result = await clienteServices.RegisterDetalhesFicha(data);
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
  const result = await clienteServices.RegisterDetalhesFicha(data);
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
  const result = await clienteServices.RegisterDetalhesFicha(data);
  await UpdateClienteFichaTreinoC(cliIdFichaTreinoC);
  formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
  formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
});

function MostrarTela(tela) {
  TelaFicha.style.display = "block";
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
