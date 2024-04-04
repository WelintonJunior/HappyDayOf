FUNCIONARIO = 1;

//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento

const dados = JSON.parse(localStorage.getItem("dados"));
const idAcademia = dados.funIdAcad;

document.addEventListener("DOMContentLoaded", async function () {
  const result = await ReadAcademia(idAcademia);
  document.getElementById(
    "funInfo"
  ).innerHTML = `Olá Funcionario: ${dados.funNome} da Academia: ${result.acaNome}`;
});

let tela = "";

//Declara os botoes da nav laterais
const btnAtendimento = document.getElementById("btnAtendimento");
const btnFicha = document.getElementById("btnFicha");
const btnCliente = document.getElementById("btnCliente");

//Declara as telas que são mostradas após clicar em algum botao
const TelaAtendimento = document.getElementById("TelaAtendimento");
const TelaFicha = document.getElementById("TelaFicha");
const TelaClientes = document.getElementById("TelaClientes");

const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnArchiveCliente = document.getElementById("btnArchiveCliente");
const btnCadastrarAtendimento = document.getElementById(
  "btnCadastrarAtendimento"
);

//Declara Formularios
const formDetCliente = document.getElementById("formDetalhesCliente");
const formCadastrarAtendimento = document.getElementById(
  "formCadastrarAtendimento"
);
const formCriarBaseFicha = document.getElementById("formCriarBaseFicha");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");

//Declara Modal
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

//btnResumo
btnAtendimento.firstChild.parentNode.style.backgroundColor = "#FC0404";
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

//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await UpdateListaCliente();
  await UpdateListaClienteFicha();
  await PreencherSelectProfessores();
  await PreencherSelectClienteAtendimento();
  await UpdateListaAtendimento();
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
    if (verificarNumeros(data.cliNome)) {
      alert("O nome não pode conter números");
      return;
    }
    await RegisterCliente(data, idAcademia);
    await UpdateListaClienteFicha();
    await UpdateListaCliente();
    modalCadastrarCliente.style.display = "none";
    e.target.reset();
  });

//Atualizar a Lista de Clientes

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
  }

  document.getElementById("tableClientes").appendChild(tabela);

  const planos = await ReadPlanos(idAcademia);
  for (i = 0; i < planos.length; i++) {
    document.getElementById(
      "cliPlano"
    ).innerHTML += `<option value=${planos[i].plaId}>${planos[i].plaNome}</option>`;
  }
}

//Atualizar a Lista de Atendimento

async function UpdateListaAtendimento() {
  const result = await ReadAtendimento(idAcademia, dados.funId);
  //Colocar em alguma lista
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
  if (result) {
    result.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "ateId",
        "cliNome",
        "ateStatus",
        "ateDateInicio",
        "ateDateEncerramento",
      ];
      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          if (campo === "ateStatus") {
            celula.innerHTML =
              item[campo] === "1"
                ? `<span class="text-success">Aberto</span>`
                : `<span class="text-danger">Fechado</span>`;
          } else if (
            campo === "ateDateInicio" ||
            campo === "ateDateEncerramento"
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
      if(item.ateStatus === '1') {
        let celulaBotao = linha.insertCell();
        let botaoEncerrar = document.createElement("button");
        botaoEncerrar.textContent = "Encerrar";
        botaoEncerrar.addEventListener("click", async function () {
          const data = {};
          const dateNow = getFormattedDateTime();
          data.ateId = item.ateId;
          data.dateNow = dateNow;
          await UpdateStatusAtendimento(idAcademia, data);
          await UpdateListaAtendimento();
        });
        celulaBotao.appendChild(botaoEncerrar);
      }
    });
  }

  document.getElementById("tableAtendimento").appendChild(tabela);
}

//Atualizar a Lista de Fichas

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

  if (result) {
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
  const result = await UpdateClienteDetalhes(data);
  Object.keys(result).forEach((key) => {
    let input = formDetCliente.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetCliente.reset();
  await UpdateListaClienteFicha();
  await UpdateListaClienteFicha();
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
});

//Função de mostrar o modal Arquivar Cliente

btnArchiveCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  modalArquivarCliente.style.display = "block";
});

const formArquivarCliente = document.getElementById("formArquivarCliente");

//Função de Arquivamento Cliente

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await ArchiveCliente(cliId);
  formDetCliente.reset();
  modalArquivarCliente.style.display = "none";
  await UpdateListaCliente();
  MostrarTela("TelaClientes");
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

//Form Cadastrar Atendimento
formCadastrarAtendimento.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const dateNow = getFormattedDateTime();
  data.dateNow = dateNow;
  data.funId = dados.funId;
  const result = await ValidacaoAtendimento(idAcademia, data);
  if (result) {
    const result = await RegisterAtendimento(idAcademia, data);
    await UpdateListaAtendimento();
    modalCadastrarAtendimento.style.display = "none";
  } else {
    alert("Já possui um Atendimento em aberto");
    modalCadastrarAtendimento.style.display = "none";
  }
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
  const result = await ReadFuncionario(1, idAcademia);
  document.getElementById("funFicha").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "funFicha"
      ).innerHTML += `<option value=${item.funId}>${item.funNome}</option>`;
    });
  }
}
async function PreencherSelectClienteAtendimento() {
  const result = await ReadCliente(idAcademia);
  document.getElementById("selectClienteAtendimento").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "selectClienteAtendimento"
      ).innerHTML += `<option value=${item.cliId}>${item.cliNome}</option>`;
    });
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
  formInserirTreinoA.reset();
  formInserirTreinoB.reset();
  formInserirTreinoC.reset();
  switch (tela) {
    case "TelaAtendimento":
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "block";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      break;
    case "TelaFicha":
      if (TelaFicha.style.display === "block") {
        TelaFicha.style.display = "none";
        TelaAtendimento.style.display = "block";
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#FC0404";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "block";
      TelaClientes.style.display = "none";
      break;
    case "TelaClientes":
      if (TelaClientes.style.display === "block") {
        TelaClientes.style.display = "none";
        TelaAtendimento.style.display = "block";
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#FC0404";
        btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#FC0404";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "block";
      break;
    default:
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      break;
  }
}

// Cadastrar Atendimento

// document
//   .getElementById("formCadastrarAtendimento")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.target);
//     const data = Object.fromEntries(fd.entries());
//     const result = await RegisterAtendimento(idAcademia, data);
//     console.log(result);
//   });
