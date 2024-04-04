EQUIPE = 1;

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
  await CarregarTabela();
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

//Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);
document.getElementById("eqpInfo").innerHTML = `Olá Equipe: ${dados.funNome}`;

//Form Create Academia

formAcademia.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const result = await CreateAcademia(data);
  InsertAcademiaToTheOptions();
  e.target.reset();
  console.log(result);
  modalCadastrarAcademia.style.display = "none";
  modalCadastrarAdministradorAcademia.style.display = "block";
});

//Form Create Administrador para academia

formAdministradorAcademia.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.admDataCmc = await getFormattedDateTime();
  const result = await AddAdministrador(data);
  e.target.reset();
  modalCadastrarAdministradorAcademia.style.display = "none";
  console.log(result);
});

//Função para pegar os dados da api de cep e jogar nos campos

const admCep = document.getElementById("admCep");
admCep.addEventListener("blur", (e) => {
  cepAutomatico(e.target.value).then((data) => {
    if (data) {
      document.getElementById("admCidade").value = data.localidade;
      document.getElementById("admEstado").value = data.uf;
      document.getElementById("admRua").value = data.logradouro;
    }
  });
});

//Funcao de mostrar tela

const TelaAcademia = document.getElementById("TelaAcademia");

function MostrarTela(tela) {
  switch (tela) {
    case "TelaAcademia":
      if (TelaAcademia.style.display === "block") {
        TelaAcademia.style.display = "none";
        return;
      }
      TelaAcademia.style.display = "block";
      //  Desabilitar outras telas (caso haja)
      // formAdministradorAcademiaBox.style.display = "none";
      break;
  }
}
