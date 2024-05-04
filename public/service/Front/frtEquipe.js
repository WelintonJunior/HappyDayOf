const eqpServices = new EquipeServices();
let dados = [];
let token = ""
//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage.dados;
    token = dadosFromLocalStorage.token;
  } else {
    eqpServices.handleAcessoNegado()
  }
} catch (err) {
  eqpServices.handleAcessoNegado()
}
//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
document.getElementById("eqpInfo").innerHTML = `Olá Equipe: ${dados.FunNome}`;

//Pega o id da Academia de acordo com o usuario logado no momento
const idAcademia = dados.FunIdAcad;
let tela = "";

const TEMPO_EXPIRACAO = 3600 * 8000;

const logoutInterval = setTimeout(async () => {
  const result = await eqpServices.VerificarSessao(token);
  if (result === "Sessão expirada faça login novamente") {
    alert(result)
    admServices.login.handleLogout();
  }
}, (TEMPO_EXPIRACAO) + 1500);

let formAcademiaBox = document.getElementById("formAcademiaBox");
let formAdministradorAcademiaBox = document.getElementById(
  "formAdministradorAcademiaBox"
);
let listBox = document.getElementById("listBox");

//Ao Clicar no botao Academia da nav ele mostra o conteudo da Tela Academia

document.getElementById("btnAcademia").addEventListener("click", () => {
  MostrarTela("TelaAcademia");
});

//Função para carregar a tabela logo quando entra na pagina

document.addEventListener("DOMContentLoaded", async function () {
  await eqpServices.ReadAcademiaLista(token);
});

//Modal

let modalCadastrarAcademia = document.getElementById("modalCadastrarAcademia");
let modalCadastrarAdministradorAcademia = document.getElementById(
  "modalCadastrarAdministradorAcademia"
);
let abrirModalRegisterAcademia = document.getElementById(
  "abrirModalRegisterAcademia"
);
let spanFecharCadastrarAcademia = document.getElementsByClassName("fechar")[0];
let spanFecharCadastrarAdministradorAcademia =
  document.getElementsByClassName("fechar")[1];

//Ao Clicar no botao Cadastrar Academia abre o modal

abrirModalRegisterAcademia.onclick = function () {
  const dateTimeNow = getFormattedDateTime();
  const dateNow = dateTimeNow.split(' ')[0];
  document.getElementById("acaDataCadastro").value = dateNow
  modalCadastrarAcademia.style.display = "block";
};

// Ao clicar no X fecha o modal

spanFecharCadastrarAcademia.onclick = function () {
  modalCadastrarAcademia.style.display = "none";
};

//Clicar Fora fecha o Modal

window.onclick = function (event) {
  if (event.target == modalCadastrarAcademia) {
    modalCadastrarAcademia.style.display = "none";
  }
};

let formAcademia = document.getElementById("formAcademia");
let formAdministradorAcademia = document.getElementById(
  "formAdministradorAcademia"
);


//Form Create Academia

formAcademia.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const result = await eqpServices.CreateAcademia(data, token);
  eqpServices.InsertAcademiaToTheOptions(token);
  e.target.reset();
  modalCadastrarAcademia.style.display = "none";
  modalCadastrarAdministradorAcademia.style.display = "block";
});

//Form Create Administrador para academia

formAdministradorAcademia.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.admDataCmc = await getFormattedDateTime();
  await eqpServices.AddAdministrador(data, token);
  e.target.reset();
  modalCadastrarAdministradorAcademia.style.display = "none";
  await eqpServices.ReadAcademiaLista(token);
});

//Função para pegar os dados da api de cep e jogar nos campos

const admCep = document.getElementById("admCep");
admCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("admCidade").value = data.localidade;
      document.getElementById("admEstado").value = data.uf;
      document.getElementById("admRua").value = data.logradouro;
    } else {
      alert("Cep não encontrado")
      e.target.value = "";
    }
  });
});

//Função para Validar o cep de entrada da academia

const acaCep = document.getElementById("acaCep");
acaCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (!data) {
      alert("Cep não encontrado")
      e.target.value = "";
    }
  });
});

//logout
document.getElementById("btnLogout").addEventListener("click", (e) => {
  e.preventDefault();
  eqpServices.handleLogout();
});


//Funcao de mostrar tela

const TelaAcademia = document.getElementById("TelaAcademia");
const btnAcademia = document.getElementById("btnAcademia");
TelaAcademia.style.display = "block";
btnAcademia.firstChild.parentNode.style.backgroundColor = "#FC0404";

function MostrarTela(tela) {
  // btnEnviarDetalhesCliente.style.display = "none";
  // btnEditarDetalhesCliente.style.display = "block";
  formAcademia.reset();
  switch (tela) {
    case "TelaAcademia":
      TelaAcademia.style.display = "block";
      btnAcademia.firstChild.parentNode.style.backgroundColor = "#FC0404";
      // btnFicha.firstChild.parentNode.style.backgroundColor = "#2e2e2e";
      break;
  }
}
