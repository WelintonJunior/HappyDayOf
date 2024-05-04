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

//Ver Clientes/Funcionarios
document.addEventListener("DOMContentLoaded", async function () {
  await UpdateListaCliente(token);
  await UpdateListaClienteFicha(token);
  await PreencherSelectProfessores(token);
  await PreencherSelectClienteAtendimento(token);
  await UpdateListaAtendimento(token);
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
    modalCadastrarCliente.style.display = "none";
    e.target.reset();
  });

//Atualizar a Lista de Clientes

async function UpdateListaCliente(token) {
  const result = await funServices.ReadCliente(idAcademia, token);
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

async function UpdateListaAtendimento(token) {
  const result = await funServices.ReadAtendimento(idAcademia, dados.FunId, token);
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
  if (result.length > 0) {
    result.forEach((item) => {
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
            celula.innerHTML =
              item[campo] === 1
                ? `<span class="text-success">Aberto</span>`
                : `<span class="text-danger">Fechado</span>`;
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

async function UpdateListaClienteFicha(token) {
  const result = await funServices.ReadClienteFicha(idAcademia, token);
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
          await PreencherSelectProfessores();
          modalCriarBaseFicha.style.display = "block";
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
    if (novoValor == "") {
      await funServices.DeleteCampoFicha(data, token);
      await UpdateClienteFichaTreinoA(cliId, token);
      await UpdateClienteFichaTreinoB(cliId, token);
      await UpdateClienteFichaTreinoC(cliId, token);
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
      if (novoValor == "") {
        await funServices.DeleteCampoFicha(data, token);
        await UpdateClienteFichaTreinoA(cliId, token);
        await UpdateClienteFichaTreinoB(cliId, token);
        await UpdateClienteFichaTreinoC(cliId, token);

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


async function UpdateClienteFichaTreinoA(cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "A", token);
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
    });

    document.getElementById("listaTreinoA").appendChild(tabela);
  }
}

async function UpdateClienteFichaTreinoB(cliId, token) {
  const result = await funServices.ReadFichaDetalhes(cliId, "B", token);
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
  const result = await funServices.ReadFichaDetalhes(cliId, "C", token);
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


//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId, token) {
  const result = await funServices.ReadClienteDetalhes(idAcademia, cliId, token);
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
    const result = await funServices.RegisterAtendimento(idAcademia, data, token);
    await UpdateListaAtendimento(token);
    modalCadastrarAtendimento.style.display = "none";
  } else {
    alert("Já possui um Atendimento em aberto");
    modalCadastrarAtendimento.style.display = "none";
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
  const result = await funServices.RegisterBaseFicha(idAcademia, data, token);
  await UpdateListaClienteFicha(token);
  document.getElementById("modalCriarBaseFicha").style.display = "none";
  MostrarTelaCriarFicha(data.ficCliId, token);
});

async function MostrarTelaCriarFicha(cliId, token) {
  MostrarTela();
  // document.getElementById("sidebarHeader").style.paddingTop = "100px"
  TelaCriarFicha.style.display = "block";
  await UpdateClienteFichaTreinoA(cliId, token);
  await UpdateClienteFichaTreinoB(cliId, token);
  await UpdateClienteFichaTreinoC(cliId, token);
  const result = await funServices.ReadFichaDetalhesGeral(cliId, token);
  const dadosCliente = await funServices.ReadClienteDetalhes(
    idAcademia, result[0].FicIdCliente, token
  );
  const dadosFuncionario = await funServices.ReadFuncionarioDetalhes(
    idAcademia, result[0].FicIdFuncionario, token
  );
  document.getElementById("idFichaTreinoA").value =
    result.length > 0 ? result[0].FicId : result.FicId;
  document.getElementById("idFichaTreinoB").value =
    result.length > 0 ? result[0].FicId : result.FicId;
  document.getElementById("idFichaTreinoC").value =
    result.length > 0 ? result[0].FicId : result.FicId;
  document.getElementById("cliIdAtual").value =
    result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente;
  document.getElementById("cliIdFichaTreinoA").value =
    result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente;
  document.getElementById("cliIdFichaTreinoB").value =
    result.length > 0 ? result[0].FicIdCliente : result.FicIdCliente;
  document.getElementById("cliIdFichaTreinoC").value =
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

formInserirTreinoA.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const cliIdFichaTreinoA = document.getElementById("cliIdFichaTreinoA").value;
  const idFicha = document.getElementById("idFichaTreinoA").value;
  data.detIdFicha = idFicha;
  data.detTreino = "A";
  const verificacao = await verificarForm(data);
  data.cliIdFicha = document.getElementById("cliIdAtual").value;
  if (!verificacao) {
    const result = await funServices.RegisterDetalhesFicha(data, token);
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
  const verificacao = await verificarForm(data);
  data.cliIdFicha = document.getElementById("cliIdAtual").value;
  if (!verificacao) {
    const result = await funServices.RegisterDetalhesFicha(data, token);
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
  data.cliIdFicha = document.getElementById("cliIdAtual").value;
  if (!verificacao) {
    const result = await funServices.RegisterDetalhesFicha(data, token);
    await UpdateClienteFichaTreinoC(cliIdFichaTreinoC, token);
    formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
    formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
  } else {
    alert("Você precisa preencher todos os campos")
  }
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
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
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
        btnAtendimento.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnAtendimento.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaAtendimento.style.display = "none";
      TelaFicha.style.display = "block";
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
      btnCliente.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
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
