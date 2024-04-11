async function AddAdministrador(data) {
  const response = await fetch("/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "AddAdministrador",
      data,
    }),
  });
  const result = await response.json();
  return result;
}

async function CreateAcademia(data) {
  const response = await fetch("/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "CreateAcademia",
      data,
    }),
  });

  const result = await response.json();
  return result;
}

async function CarregarTabela() {
  const response = await fetch("/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadAcademiaLista",
    }),
  });
  const dados = await response.json();

  document.getElementById("table").innerHTML = ""

  const tabela = document.createElement("table");
  tabela.setAttribute("border", "1");

  const cabecalho = tabela.createTHead();
  const linhaCabecalho = cabecalho.insertRow();
  const titulos = [
    "Nome",
    "Data Cadastro",
    "Status",
    "Celular",
    // "Ver Detalhes"
  ];
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
}

async function InsertAcademiaToTheOptions() {
  let admAcademia = document.getElementById("admAcademia");
  const response = await fetch("/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadLastAcademia",
    }),
  });
  const result = await response.json();
  admAcademia.innerHTML = "";
  admAcademia.innerHTML += `<option value='${result[0].acaId}'></option>`;
}

//Validação

const admCpf = document.getElementById("admCpf");
const acaTelefone = document.getElementById("acaTelefone");
const acaCnpj = document.getElementById("acaCnpj");
const acaCelular = document.getElementById("acaCelular");
const admCelular = document.getElementById("admCelular");
const admEmail = document.getElementById("admEmail");
admCpf.addEventListener("input", () => HandleInputCpf(admCpf));
admCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "fun"));
admCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
acaCnpj.addEventListener("input", () => HandleInputCnpj(acaCnpj));
acaCnpj.addEventListener("blur", () => HandleBlurCnpj(acaCnpj));
acaTelefone.addEventListener("input", () => FormatarTelefone(acaTelefone));
acaCelular.addEventListener("input", () => FormatarCelular(acaCelular));
admCelular.addEventListener("input", () => FormatarCelular(admCelular));
admEmail.addEventListener("blur", (e) => VerificarEmailCadastrado(e, e.target.value, "fun"));

