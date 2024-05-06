const admServices = new AdministradorServices();
let dados = [];
let token = ""
let tela = "";

//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage.dados;
    token = dadosFromLocalStorage.token;
  } else {
    admServices.login.handleAcessoNegado();
  }
} catch (err) {
  admServices.login.handleAcessoNegado();
}


//Pega o id da Academia de acordo com o usuario logado no momento
const idAcademia = dados.FunIdAcad;
//Declara os botoes da nav laterais

const TEMPO_EXPIRACAO = 3600 * 8000;

const logoutInterval = setTimeout(async () => {
  const result = await admServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result)
    admServices.login.handleLogout();
  }
}, (TEMPO_EXPIRACAO) + 1500);

const btnResumo = document.getElementById("btnResumo");
const btnCliente = document.getElementById("btnCliente");
const btnFicha = document.getElementById("btnFicha");
const btnFuncionario = document.getElementById("btnFuncionario");
const btnAparelho = document.getElementById("btnAparelho");
const btnExercicio = document.getElementById("btnExercicio");
const TelaResumo = document.getElementById("TelaResumo");
const TelaFicha = document.getElementById("TelaFicha");
const TelaClientes = document.getElementById("TelaClientes");
const TelaDetalhesClientes = document.getElementById("TelaDetalhesClientes");
const TelaFuncionarios = document.getElementById("TelaFuncionarios");
const TelaAparelhos = document.getElementById("TelaAparelhos");
const TelaExercicios = document.getElementById("TelaExercicios");
const TelaDetalhesFuncionarios = document.getElementById(
  "TelaDetalhesFuncionarios"
);
const TelaDetalhesExercicios = document.getElementById(
  "TelaDetalhesExercicios"
);
const TelaDetalhesAparelhos = document.getElementById(
  "TelaDetalhesAparelhos"
);
const btnEditarDetalhesFuncionario = document.getElementById(
  "btnEditarDetalhesFuncionario"
);
const btnEnviarDetalhesFuncionario = document.getElementById(
  "btnEnviarDetalhesFuncionario"
);
const btnEditarDetalhesExercicio = document.getElementById(
  "btnEditarDetalhesExercicio"
);
const btnEditarDetalhesAparelho = document.getElementById(
  "btnEditarDetalhesAparelho"
);
const btnEnviarDetalhesExercicio = document.getElementById(
  "btnEnviarDetalhesExercicio"
);
const btnEnviarDetalhesAparelho = document.getElementById(
  "btnEnviarDetalhesAparelho"
);
const btnEditarDetalhesCliente = document.getElementById(
  "btnEditarDetalhesCliente"
);
const btnEnviarDetalhesCliente = document.getElementById(
  "btnEnviarDetalhesCliente"
);
const btnArchiveCliente = document.getElementById("btnArchiveCliente");
const btnArchiveFuncionario = document.getElementById("btnArchiveFuncionario");
const btnArchiveAparelho = document.getElementById("btnArchiveAparelho");
const btnArchiveExercicio = document.getElementById("btnArchiveExercicio");
const btnAtivarCliente = document.getElementById("btnAtivarCliente");
const btnAtivarFuncionario = document.getElementById("btnAtivarFuncionario");
const btnAtivarAparelho = document.getElementById("btnAtivarAparelho");
const btnAtivarExercicio = document.getElementById("btnAtivarExercicio");
const btnVoltarTelaFuncionario = document.getElementById("btnVoltarTelaFuncionario");
const btnVoltarTelaCliente = document.getElementById("btnVoltarTelaCliente");
const btnVoltarTelaFicha = document.getElementById("btnVoltarTelaFicha");
const btnVoltarTelaAparelho = document.getElementById("btnVoltarTelaAparelho");
const btnVoltarTelaExercicio = document.getElementById("btnVoltarTelaExercicio");
const formDetCliente = document.getElementById("formDetalhesCliente");
const formDetFuncionario = document.getElementById("formDetalhesFuncionario");
const formDetAparelho = document.getElementById("formDetAparelho");
const formDetExercicio = document.getElementById("formDetExercicio");
const formCriarBaseFicha = document.getElementById("formCriarBaseFicha");
const formInserirTreinoA = document.getElementById("formInserirTreinoA");
const formInserirTreinoB = document.getElementById("formInserirTreinoB");
const formInserirTreinoC = document.getElementById("formInserirTreinoC");
const formArquivarFuncionario = document.getElementById(
  "formArquivarFuncionario"
);
const formCadastrarExercicio = document.getElementById(
  "formCadastrarExercicio"
);
const formCadastrarAparelho = document.getElementById(
  "formCadastrarAparelho"
);
const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");
const modalCriarBaseFicha = document.getElementById("modalCriarBaseFicha");
const modalCadastrarFuncionario = document.getElementById(
  "modalCadastrarFuncionario"
);
const modalCadastrarAparelho = document.getElementById(
  "modalCadastrarAparelho"
);
const modalCadastrarExercicio = document.getElementById(
  "modalCadastrarExercicio"
);
const modalArquivarCliente = document.getElementById("modalArquivarCliente");
const modalArquivarFuncionario = document.getElementById(
  "modalArquivarFuncionario"
);
const modalArquivarAparelho = document.getElementById(
  "modalArquivarAparelho"
);
const modalArquivarExercicio = document.getElementById(
  "modalArquivarExercicio"
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
const fecharModalArquivarAparelho = document.getElementById(
  "fecharModalArquivarAparelho"
);
const fecharModalCadastrarAparelho = document.getElementById(
  "fecharModalCadastrarAparelho"
);
const fecharModalArquivarExercicio = document.getElementById(
  "fecharModalArquivarExercicio"
);
const fecharModalCadastrarExercicio = document.getElementById(
  "fecharModalCadastrarExercicio"
);

let CheckBoxRestricoes = document.getElementById("ficRestricoes");

//Dados de Boas vindas

document.addEventListener("DOMContentLoaded", async function () {
  // admServices.VerificarSessao(token)
  const result = await admServices.ReadAcademia(idAcademia, token);
  document.getElementById("titleAcad").innerHTML = result.AcaNome;
  document.getElementById(
    "admInfo"
  ).innerHTML = `Olá Administrador: ${dados.FunNome} da Academia: ${result.AcaNome}`;
});

//btnResumo
btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
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

//btnAparelho
btnAparelho.addEventListener("click", async (e) => {
  e.preventDefault();
  MostrarTela("TelaAparelhos");
});

//btnExercicio
btnExercicio.addEventListener("click", (e) => {
  e.preventDefault();
  MostrarTela("TelaExercicios");
});

//Ver Clientes/Funcionarios/Aparelhos/Exercicios
document.addEventListener("DOMContentLoaded", async function () {
  await UpdateListaCliente(token);
  await UpdateListaFuncionario(token);
  await UpdateListaClienteFicha(token);
  await PreencherSelectProfessores(token);
  await PreencherSelectAparelhos(token);
  await UpdateListaAparelho(token);
  await UpdateListaExercicio(token)
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
  TelaDetalhesAparelhos.style.display = "none";
  TelaDetalhesExercicios.style.display = "none";
  TelaCriarFicha.style.display = "none";
  // document.getElementById("listaTreinoA").innerHTML = "";
  // document.getElementById("listaTreinoB").innerHTML = "";
  // document.getElementById("listaTreinoC").innerHTML = "";
  document.getElementById("sidebarHeader").style.paddingTop = "20px"
  formDetCliente.reset();
  formDetFuncionario.reset();
  formCriarBaseFicha.reset();
  // formInserirTreinoA.reset();
  // formInserirTreinoB.reset();
  // formInserirTreinoC.reset();
  switch (tela) {
    case "TelaResumo":
      btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "block";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      TelaAparelhos.style.display = "none";
      TelaExercicios.style.display = "none";

      break;
    case "TelaFicha":
      if (TelaFicha.style.display === "block") {
        TelaFicha.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "block";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      TelaAparelhos.style.display = "none";
      TelaExercicios.style.display = "none";
      break;
    case "TelaClientes":
      if (TelaClientes.style.display === "block") {
        TelaClientes.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "block";
      TelaFuncionarios.style.display = "none";
      TelaAparelhos.style.display = "none";
      TelaExercicios.style.display = "none";
      break;
    case "TelaFuncionarios":
      if (TelaFuncionarios.style.display === "block") {
        TelaFuncionarios.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "block";
      TelaAparelhos.style.display = "none";
      TelaExercicios.style.display = "none";
      break;
    case "TelaAparelhos":
      if (TelaAparelhos.style.display === "block") {
        TelaAparelhos.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaAparelhos.style.display = "block";
      TelaFuncionarios.style.display = "none";
      TelaExercicios.style.display = "none";
      break;
    case "TelaExercicios":
      if (TelaExercicios.style.display === "block") {
        TelaExercicios.style.display = "none";
        TelaResumo.style.display = "block";
        btnResumo.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
        btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
        return;
      }
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#3EB1E2";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaExercicios.style.display = "block";
      TelaFuncionarios.style.display = "none";
      TelaAparelhos.style.display = "none";
      break;
    default:
      btnResumo.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnCliente.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnFuncionario.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnAparelho.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      btnExercicio.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      TelaResumo.style.display = "none";
      TelaFicha.style.display = "none";
      TelaClientes.style.display = "none";
      TelaFuncionarios.style.display = "none";
      TelaAparelhos.style.display = "none";
      TelaExercicios.style.display = "none";
      break;
  }
}

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

//Abrir Modal Aparelho

document
  .getElementById("abrirModalRegisterAparelho")
  .addEventListener("click", (e) => {
    e.preventDefault();
    modalCadastrarAparelho.style.display = "block";
  });

//Fechar Modal Aparelho

fecharModalCadastrarAparelho.onclick = function () {
  modalCadastrarAparelho.style.display = "none";
};

//Clicar Fora fecha o Modal Aparelho

window.onclick = function (event) {
  if (event.target == modalCadastrarAparelho) {
    modalCadastrarAparelho.style.display = "none";
  }
};

//Abrir Modal Exercicio

document
  .getElementById("abrirModalRegisterExercicio")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    await PreencherSelectAparelhos(token);
    modalCadastrarExercicio.style.display = "block";
  });

//Fechar Modal Exercicio

fecharModalCadastrarExercicio.onclick = function () {
  modalCadastrarExercicio.style.display = "none";
};

//Clicar Fora fecha o Modal Exercicio

window.onclick = function (event) {
  if (event.target == modalCadastrarExercicio) {
    modalCadastrarExercicio.style.display = "none";
  }
};

//Fechar Modal arquivar Exercicio

fecharModalArquivarExercicio.onclick = function () {
  modalArquivarExercicio.style.display = "none";
};

//Clicar Fora fecha o Modal arquivar Exercicio

window.onclick = function (event) {
  if (event.target == modalArquivarExercicio) {
    modalArquivarExercicio.style.display = "none";
  }
};

//Fechar Modal arquivar Aparelho

fecharModalArquivarAparelho.onclick = function () {
  modalArquivarAparelho.style.display = "none";
};

//Clicar Fora fecha o Modal arquivar Aparelho

window.onclick = function (event) {
  if (event.target == modalArquivarAparelho) {
    modalArquivarAparelho.style.display = "none";
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
    modalCadastrarCliente.style.display = "none";
    showLoading()
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (verificarNumeros(data.cliNome)) {
      alert("O nome não pode conter números");
      return;
    }
    data.cliDataCmc = await getFormattedDateTime();
    await admServices.RegisterCliente(data, idAcademia, token);
    await UpdateListaClienteFicha(token);
    await UpdateListaCliente(token);
    e.target.reset();
    hideLoading()
  });

//Cadastrar Funcionario

document
  .getElementById("formCadastrarFuncionario")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    modalCadastrarFuncionario.style.display = "none";
    showLoading()
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (verificarNumeros(data.funNome)) {
      alert("O nome não pode conter números");
      return;
    }
    data.funDataCmc = await getFormattedDateTime();
    await admServices.RegisterFuncionario(data, idAcademia, token);
    await UpdateListaFuncionario(token);
    await UpdateListaClienteFicha(token);
    e.target.reset();
    hideLoading()
  });

//Cadastrar Aparelho

formCadastrarAparelho.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalCadastrarAparelho.style.display = "none";
  showLoading()
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries())
  data.apaDataEntrada = await getFormattedDateTime();
  await admServices.RegisterAparelho(data, idAcademia, token)
  await UpdateListaAparelho(token);
  e.target.reset();
  hideLoading()
})

//Cadastrar Exercicio

formCadastrarExercicio.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalCadastrarExercicio.style.display = "none";
  showLoading()
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries())
  const result = await admServices.RegisterExercicio(data, idAcademia, token)
  await UpdateListaExercicio(token);
  e.target.reset();
  hideLoading()
})


//Atualizar a Lista de Clientes

async function UpdateListaCliente(token, filtroNome = "") {
  const result = await admServices.ReadCliente(idAcademia, token);
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

  const planos = await admServices.ReadPlanos(idAcademia, token);
  for (i = 0; i < planos.length; i++) {
    document.getElementById(
      "cliPlano"
    ).innerHTML += `<option value=${planos[i].PlaId}>${planos[i].PlaNome}</option>`;
  }
}

//Atualizar a Lista de Funcionarios

async function UpdateListaFuncionario(token, filtroNome = "") {
  const result = await admServices.ReadFuncionario(1, idAcademia, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.FunNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

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
  if (resultadosFiltrados) {
    resultadosFiltrados.forEach((item) => {
      const linha = corpoTabela.insertRow();
      const camposSelecionados = [
        "FunId",
        "FunNome",
        "FunCelular",
        "FunStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "FunStatus") {
            celula.innerHTML =
              item[campo] === 1
                ? `<span class="text-success">Ativo</span>`
                : `<span class="text-danger">Desativado</span>`;
          }

          if (campo === "FunId") {
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

//Atualizar a Lista de Aparelhos

async function UpdateListaAparelho(token, filtroNome = "") {
  const result = await admServices.ReadAparelho(idAcademia, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.ApaNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

  //Colocar em alguma lista
  const containerTabela = document.getElementById("tableAparelhos");
  const tabelaExistente = containerTabela.querySelector("table");
  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }
  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = ["Id", "Nome", "Status", "Ver Detalhes"];
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
        "ApaId",
        "ApaNome",
        "ApaStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "ApaStatus") {
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
        MostrarTelaDetalhesAparelho(item.ApaId, token);
      });
      celulaBotao.appendChild(botaoDetalhes);
    });
  }

  document.getElementById("tableAparelhos").appendChild(tabela);
}

//Atualizar a Lista de Aparelhos

async function UpdateListaExercicio(token, filtroNome = "") {
  const result = await admServices.ReadExercicio(idAcademia, token);
  const resultadosFiltrados = filtroNome ? result.filter(item => item.ExeNome.toLowerCase().includes(filtroNome.toLowerCase())) : result;

  //Colocar em alguma lista
  const containerTabela = document.getElementById("tableExercicios");
  const tabelaExistente = containerTabela.querySelector("table");
  if (tabelaExistente) {
    containerTabela.removeChild(tabelaExistente);
  }
  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = ["Id", "Nome", "Aparelho", "Status", "Ver Detalhes"];
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
        "ExeId",
        "ExeNome",
        "ApaNome",
        "ExeStatus",
      ];

      camposSelecionados.forEach((campo) => {
        if (item.hasOwnProperty(campo)) {
          let celula = linha.insertCell();
          celula.textContent = item[campo];
          if (campo === "ExeStatus") {
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
        MostrarTelaDetalhesExercicio(item.ExeId, token);
      });
      celulaBotao.appendChild(botaoDetalhes);
    });
  }

  document.getElementById("tableExercicios").appendChild(tabela);
}

//Atualizar a Lista de Fichas

async function UpdateListaClienteFicha(token, filtroNome = "") {
  const result = await admServices.ReadClienteFicha(idAcademia, token);
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
      data.cliIdFicha = document.getElementById("cliIdAtual").value;
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

//Função de mostrar a tela de detalhes do Funcionario

function Detalhes(linha) {
  const funId = linha.querySelector("[data-id]").getAttribute("data-id");
  MostrarTelaDetalhesFuncionario(funId, token);
}

//Função de mostrar a tela de detalhes do cliente

async function MostrarTelaDetalhesCliente(cliId, token) {
  const result = await admServices.ReadClienteDetalhes(idAcademia, cliId, token);
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
  const result = await admServices.UpdateClienteDetalhes(data, token);
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

const formArquivarCliente = document.getElementById("formArquivarCliente");

btnVoltarTelaCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes");
})

//Função de Arquivamento Cliente

formArquivarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cliId = document.getElementById("cliDetId").value;
  await admServices.ArchiveCliente(cliId, token);
  formDetCliente.reset();
  modalArquivarCliente.style.display = "none";
  await UpdateListaClienteFicha(token);
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes");
});

//Função de mostrar a tela de detalhes do aparelho

async function MostrarTelaDetalhesAparelho(apaId, token) {
  const result = await admServices.ReadAparelhoDetalhes(idAcademia, apaId, token);
  MostrarTela();
  TelaDetalhesAparelhos.style.display = "block";

  Object.keys(result).forEach((key) => {
    let input = formDetAparelho.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
      if (input.type === "date") {
        let dateValue = new Date(result[key]).toISOString().split("T")[0];
        input.value = dateValue;
      } else {
        input.value = result[key];
      }
    }
  });
  if (result.ApaStatus == 1) {
    btnArchiveAparelho.classList.remove("d-none")
    btnAtivarAparelho.classList.add("d-none")
  } else {
    btnAtivarAparelho.classList.remove("d-none")
    btnArchiveAparelho.classList.add("d-none")
  }


  btnEditarDetalhesAparelho.addEventListener("click", (e) => {
    e.preventDefault();
    Object.keys(result).forEach((key) => {
      let input = formDetAparelho.querySelector(`[name="${key}"]`);
      if (input) {
        input.removeAttribute("disabled");
      }
    });
    e.target.style.display = "none";
    btnEnviarDetalhesAparelho.style.display = "block";
  });
}

//Função de Edição Aparelho

btnEnviarDetalhesAparelho.addEventListener("click", async (e) => {
  e.preventDefault();
  let apaId = document.getElementById("apaDetId").value;
  const fd = new FormData(formDetAparelho);
  const data = Object.fromEntries(fd.entries());
  data.apaId = apaId;
  if (verificarNumeros(data.apaNome)) {
    alert("O nome não pode conter números");
    return;
  }
  const result = await admServices.UpdateAparelhoDetalhes(data, token);
  Object.keys(result).forEach((key) => {
    let input = formDetAparelho.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetAparelho.reset();
  e.target.style.display = "none";
  btnEditarDetalhesAparelho.style.display = "block";
  await UpdateListaAparelho(token);
  MostrarTela("TelaAparelhos");
});

//Função de mostrar o modal Arquivar Aparelho

btnArchiveAparelho.addEventListener("click", async (e) => {
  e.preventDefault();
  modalArquivarAparelho.style.display = "block";
});

const formArquivarAparelho = document.getElementById("formArquivarAparelho");

btnVoltarTelaAparelho.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaAparelho(token);
  MostrarTela("TelaAparelhos");
})

//Função de Arquivamento Aparelho

formArquivarAparelho.addEventListener("submit", async (e) => {
  e.preventDefault();
  let apaId = document.getElementById("apaDetId").value;
  await admServices.ArchiveAparelho(apaId, token);
  formDetAparelho.reset();
  modalArquivarAparelho.style.display = "none";
  await UpdateListaAparelho(token);
  MostrarTela("TelaAparelhos");
});

//Função de mostrar a tela de detalhes do Exercicio

async function MostrarTelaDetalhesExercicio(exeId, token) {
  const result = await admServices.ReadExercicioDetalhes(idAcademia, exeId, token);
  MostrarTela();
  TelaDetalhesExercicios.style.display = "block";

  Object.keys(result).forEach((key) => {
    let input = formDetExercicio.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
      if (input.type === "date") {
        let dateValue = new Date(result[key]).toISOString().split("T")[0];
        input.value = dateValue;
      } else {
        input.value = result[key];
      }
    }
  });

  if (result.ExeStatus == 1) {
    btnArchiveExercicio.classList.remove("d-none")
    btnAtivarExercicio.classList.add("d-none")
  } else {
    btnAtivarExercicio.classList.remove("d-none")
    btnArchiveExercicio.classList.add("d-none")
  }


  btnEditarDetalhesExercicio.addEventListener("click", (e) => {
    e.preventDefault();
    Object.keys(result).forEach((key) => {
      let input = formDetExercicio.querySelector(`[name="${key}"]`);
      if (input) {
        input.removeAttribute("disabled");
      }
    });
    e.target.style.display = "none";
    btnEnviarDetalhesExercicio.style.display = "block";
  });
}

//Função de Edição Exercicio

btnEnviarDetalhesExercicio.addEventListener("click", async (e) => {
  e.preventDefault();
  let exeId = document.getElementById("exeDetId").value;
  const fd = new FormData(formDetExercicio);
  const data = Object.fromEntries(fd.entries());
  data.exeId = exeId;
  if (verificarNumeros(data.exeNome)) {
    alert("O nome não pode conter números");
    return;
  }
  const result = await admServices.UpdateExercicioDetalhes(data, token);
  Object.keys(result).forEach((key) => {
    let input = formDetExercicio.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  e.target.style.display = "none";
  btnEditarDetalhesExercicio.style.display = "block";
  formDetExercicio.reset();
  await UpdateListaExercicio(token);
  MostrarTela("TelaExercicios");
});

//Função de mostrar o modal Arquivar Exercicio

btnArchiveExercicio.addEventListener("click", async (e) => {
  e.preventDefault();
  modalArquivarExercicio.style.display = "block";
});

const formArquivarExercicio = document.getElementById("formArquivarExercicio");

btnVoltarTelaExercicio.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaExercicio(token);
  MostrarTela("TelaExercicios");
})

//Função de Arquivamento Exercicio

formArquivarExercicio.addEventListener("submit", async (e) => {
  e.preventDefault();
  let exeId = document.getElementById("exeDetId").value;
  await admServices.ArchiveExercicio(exeId, token);
  formDetExercicio.reset();
  modalArquivarExercicio.style.display = "none";
  await UpdateListaExercicio(token);
  MostrarTela("TelaExercicios");
});

//Mostra a Tela de Detalhes do funcionario

async function MostrarTelaDetalhesFuncionario(funId, token) {
  const result = await admServices.ReadFuncionarioDetalhes(idAcademia, funId, token);
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

  if (result.FunStatus == 1) {
    btnArchiveFuncionario.classList.remove("d-none")
    btnAtivarFuncionario.classList.add("d-none")
  } else {
    btnAtivarFuncionario.classList.remove("d-none")
    btnArchiveFuncionario.classList.add("d-none")
  }


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
  const result = await admServices.UpdateFuncionarioDetalhes(data, token);
  Object.keys(result).forEach((key) => {
    let input = formDetFuncionario.querySelector(`[name="${key}"]`);
    if (input) {
      input.setAttribute("disabled", "disabled");
    }
  });
  formDetFuncionario.reset();
  await UpdateListaFuncionario(token);
  await UpdateListaClienteFicha(token);
  await PreencherSelectProfessores(token);
  MostrarTela("TelaFuncionarios");
});

//Função de Mostrar o Modal Arquivar Cliente

btnArchiveFuncionario.addEventListener("click", (e) => {
  e.preventDefault();
  modalArquivarFuncionario.style.display = "block";
});

btnVoltarTelaFuncionario.addEventListener("click", async (e) => {
  e.preventDefault();
  await UpdateListaFuncionario(token);
  MostrarTela("TelaFuncionarios");
})

//Função de arquivamento

formArquivarFuncionario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let funId = document.getElementById("funDetId").value;
  await admServices.ArchiveFuncionario(funId, token);
  formDetFuncionario.reset();
  modalArquivarFuncionario.style.display = "none";
  await UpdateListaFuncionario(token);
  MostrarTela("TelaFuncionarios");
});

//Ativar

btnAtivarCliente.addEventListener("click", async (e) => {
  e.preventDefault();
  let cliDetId = document.getElementById("cliDetId").value
  await admServices.AtivarCliente(cliDetId, token)
  await UpdateListaCliente(token);
  MostrarTela("TelaClientes")
})
btnAtivarFuncionario.addEventListener("click", async (e) => {
  e.preventDefault();
  let funDetId = document.getElementById("funDetId").value
  await admServices.AtivarFuncionario(funDetId, token)
  await UpdateListaFuncionario(token)
  MostrarTela("TelaFuncionarios")
})
btnAtivarAparelho.addEventListener("click", async (e) => {
  e.preventDefault();
  let apaDetId = document.getElementById("apaDetId").value
  await admServices.AtivarAparelho(apaDetId, token)
  await UpdateListaAparelho(token)
  MostrarTela("TelaAparelhos")
})
btnAtivarExercicio.addEventListener("click", async (e) => {
  e.preventDefault();
  let exeDetId = document.getElementById("exeDetId").value
  await admServices.AtivarExercicio(exeDetId, token)
  await UpdateListaExercicio(token)
  MostrarTela("TelaExercicios")
})

//LOGOUT

document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  admServices.login.handleLogout();
});

//CHECKBOX POSSUI RESTRIÇÕES

CheckBoxRestricoes.addEventListener("change", (e) => {
  document.getElementById("ficTipoRestricoes").value = "";
  if (CheckBoxRestricoes.checked) {
    document.getElementById("ficTipoRestricoesSpan").style.visibility = "visible";
  } else {
    document.getElementById("ficTipoRestricoesSpan").style.visibility = "hidden";
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
  const result = await admServices.RegisterBaseFicha(idAcademia, data, token);
  await UpdateListaClienteFicha(token);
  document.getElementById("modalCriarBaseFicha").style.display = "none";
  MostrarTelaCriarFicha(data.ficCliId, token);
});

async function MostrarTelaCriarFicha(cliId, token) {
  showLoading()
  MostrarTela();
  // document.getElementById("sidebarHeader").style.paddingTop = "100px"
  TelaCriarFicha.style.display = "block";
  await UpdateClienteFichaTreinoA(cliId, token);
  await UpdateClienteFichaTreinoB(cliId, token);
  await UpdateClienteFichaTreinoC(cliId, token);
  const result = await admServices.ReadFichaDetalhesGeral(cliId, token);
  const dadosCliente = await admServices.ReadClienteDetalhes(
    idAcademia, result[0].FicIdCliente, token
  );
  const dadosFuncionario = await admServices.ReadFuncionarioDetalhes(
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

async function PreencherSelectProfessores() {
  const result = await admServices.ReadFuncionario(1, idAcademia, token);
  document.getElementById("funFicha").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "funFicha"
      ).innerHTML += `<option value=${item.FunId}>${item.FunNome}</option>`;
    });
  }
}

async function PreencherSelectAparelhos() {
  const result = await admServices.ReadAparelho(idAcademia, token);
  document.getElementById("apaExercicio").innerHTML = "";
  document.getElementById("apaDetExercicio").innerHTML = "";
  if (result) {
    result.forEach((item) => {
      document.getElementById(
        "apaExercicio"
      ).innerHTML += `<option value=${item.ApaId}>${item.ApaNome}</option>`;
      document.getElementById(
        "apaDetExercicio"
      ).innerHTML += `<option value=${item.ApaId}>${item.ApaNome}</option>`;
    });
  }
}

// formInserirTreinoA.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const fd = new FormData(e.target);
//   const data = Object.fromEntries(fd.entries());
//   const cliIdFichaTreinoA = document.getElementById("cliIdFichaTreinoA").value;
//   const idFicha = document.getElementById("idFichaTreinoA").value;
//   data.detIdFicha = idFicha;
//   data.detTreino = "A";
//   const verificacao = await verificarForm(data);
//   data.cliIdFicha = document.getElementById("cliIdAtual").value;
//   if (!verificacao) {
//     const result = await admServices.RegisterDetalhesFicha(data, token);
//     await UpdateClienteFichaTreinoA(cliIdFichaTreinoA, token);
//     formInserirTreinoA.querySelector(`[name="detVariacao"]`).value = "";
//     formInserirTreinoA.querySelector(`[name="detSerie"]`).value = "";
//     formInserirTreinoA.querySelector(`[name="detRepeticao"]`).value = "";
//     formInserirTreinoA.querySelector(`[name="detCarga"]`).value = "";
//   } else {
//     alert("Você precisa preencher todos os campos")
//   }
// });

// formInserirTreinoB.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const fd = new FormData(e.target);
//   const data = Object.fromEntries(fd.entries());
//   const cliIdFichaTreinoB = document.getElementById("cliIdFichaTreinoB").value;
//   const idFicha = document.getElementById("idFichaTreinoB").value;
//   data.detIdFicha = idFicha;
//   data.detTreino = "B";
//   const verificacao = await verificarForm(data);
//   data.cliIdFicha = document.getElementById("cliIdAtual").value;
//   if (!verificacao) {
//     const result = await admServices.RegisterDetalhesFicha(data, token);
//     await UpdateClienteFichaTreinoB(cliIdFichaTreinoB, token);
//     formInserirTreinoB.querySelector(`[name="detVariacao"]`).value = "";
//     formInserirTreinoB.querySelector(`[name="detSerie"]`).value = "";
//     formInserirTreinoB.querySelector(`[name="detRepeticao"]`).value = "";
//     formInserirTreinoB.querySelector(`[name="detCarga"]`).value = "";
//   } else {
//     alert("Você precisa preencher todos os campos")
//   }
// });

// formInserirTreinoC.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const fd = new FormData(e.target);
//   const data = Object.fromEntries(fd.entries());
//   const cliIdFichaTreinoC = document.getElementById("cliIdFichaTreinoC").value;
//   const idFicha = document.getElementById("idFichaTreinoC").value;
//   data.detIdFicha = idFicha;
//   data.detTreino = "C";
//   const verificacao = await verificarForm(data);
//   data.cliIdFicha = document.getElementById("cliIdAtual").value;
//   if (!verificacao) {
//     const result = await admServices.RegisterDetalhesFicha(data, token);
//     await UpdateClienteFichaTreinoC(cliIdFichaTreinoC, token);
//     formInserirTreinoC.querySelector(`[name="detVariacao"]`).value = "";
//     formInserirTreinoC.querySelector(`[name="detSerie"]`).value = "";
//     formInserirTreinoC.querySelector(`[name="detRepeticao"]`).value = "";
//     formInserirTreinoC.querySelector(`[name="detCarga"]`).value = "";
//   } else {
//     alert("Você precisa preencher todos os campos")
//   }
// });

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

//Pesquisar Funcionario

let pesquisarFuncionario = document.getElementById("pesquisarFuncionario")
pesquisarFuncionario.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaFuncionario(token, nomePesquisa);
})

//Pesquisar Exercicio

let pesquisarExercicio = document.getElementById("pesquisarExercicio")
pesquisarExercicio.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaExercicio(token, nomePesquisa);
})

//Pesquisar Aparelho

let pesquisarAparelho = document.getElementById("pesquisarAparelho")
pesquisarAparelho.addEventListener("keyup", async (e) => {
  const nomePesquisa = e.target.value;
  await UpdateListaAparelho(token, nomePesquisa);
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
  const result = await admServices.ReadExercicio(idAcademia, token);
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
    };
    const cliIdFichaTreino = document.getElementById("cliIdFichaTreino").value;
    const idFicha = document.getElementById("idCriarFichaTreino").value;
    switch (auxInner) {
      case "A":
        data.detIdFicha = idFicha;
        data.detTreino = "A";
        data.cliIdFicha = document.getElementById("cliIdAtual").value;
        data.detVariacao = item.ExeNome
        data.detCarga = 0
        data.detSerie = 0
        data.detRepeticao = 0
        await admServices.RegisterDetalhesFicha(data, token);
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
        await admServices.RegisterDetalhesFicha(data, token);
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
        await admServices.RegisterDetalhesFicha(data, token);
        await UpdateCriarFichaTreinoC(cliIdFichaTreino, token);
        break;
    }
  }
}

async function UpdateCriarFichaTreinoA(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "A", token);
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
async function UpdateCriarFichaTreinoB(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "B", token);
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

    document.getElementById("listaTreinoB").appendChild(tabela);
  }
}
async function UpdateCriarFichaTreinoC(cliId, token) {
  const result = await admServices.ReadFichaDetalhes(cliId, "C", token);
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

    document.getElementById("listaTreinoC").appendChild(tabela);
  }
}

function showLoading() {
  document.getElementById('loadingOverlay').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}