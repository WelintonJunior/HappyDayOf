//Front end

let formAcademiaBox = document.getElementById("formAcademiaBox");
let formAdministradorAcademiaBox = document.getElementById(
  "formAdministradorAcademiaBox"
);
let listBox = document.getElementById("listBox");

document.getElementById("btnRegisterAcademia").addEventListener("click", () => {
  MostrarTela("CadastrarAcademia");
});

document.getElementById("btnReadAcademia").addEventListener("click", () => {
  MostrarTela("ListarAcademias");
});

//Função para carregar a tabela logo quando entra na pagina

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadAcademia",
    }),
  });
  const dados = await response.json();

  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = ["ID", "Cnpj", "Nome", "Data Cadastro", "Status", "Celular", "Cep", "Cor Tema", "Telefone"];
  titulos.forEach((texto) => {
    let th = document.createElement("th");
    th.textContent = texto;
    linhaCabecalho.appendChild(th);
  });

  const corpoTabela = tabela.appendChild(document.createElement("tbody"));

  dados.forEach((item) => {
    const linha = corpoTabela.insertRow();
    Object.values(item).forEach((texto) => {
      let celula = linha.insertCell();
      celula.textContent = texto;
    });
  });

  document.getElementById("table").appendChild(tabela);
});

//Back end

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

  const response = await fetch("http://localhost:3000/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "CreateAcademia",
      data,
    }),
  });

  const result = await response.json();
  InsertAcademiaToTheOptions();
  e.target.reset();
  console.log(result);
  MostrarTela("CadastrarAdministradorAcademia");
});

//Form Create Administrador para academia

formAdministradorAcademia.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.admDataCmc = getFormattedDateTime();
  const response = await fetch("http://localhost:3000/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "AddAdministrador",
      data,
    }),
  });
  const result = await response.json();
  e.target.reset();
  console.log(result);
});

//Função para buscar as academias

document.addEventListener("DOMContentLoaded", async function () {
  InsertAcademiaToTheOptions();
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

function MostrarTela(tela) {
  switch (tela) {
    case "CadastrarAcademia":
      if (formAcademiaBox.style.display === "block") {
        formAcademiaBox.style.display = "none";
        return
      }
      formAcademiaBox.style.display = "block";
      formAdministradorAcademiaBox.style.display = "none";
      listBox.style.display = "none";
      break;
    case "ListarAcademias":
      if (listBox.style.display === "block") {
        listBox.style.display = "none";
        return
      }
      formAcademiaBox.style.display = "none";
      formAdministradorAcademiaBox.style.display = "none";
      listBox.style.display = "block";
      break;
    case "CadastrarAdministradorAcademia":
      if (formAdministradorAcademiaBox.style.display === "block") {
        formAdministradorAcademiaBox.style.display = "none";
        return
      }
      formAcademiaBox.style.display = "none";
      formAdministradorAcademiaBox.style.display = "block";
      listBox.style.display = "none";
      break;
  }
}
