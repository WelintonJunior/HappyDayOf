const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);
document.getElementById("eqpInfo").innerHTML = `Olá Equipe: ${dados.funNome}`

//Form Create Academia

document
  .getElementById("formAcademia")
  .addEventListener("submit", async (e) => {
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
    console.log(result);
  });

//Form Create Administrador para academia

document
  .getElementById("formAdministradorAcademia")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data.admDataCmc = getFormattedDateTime();
    console.log(data);
    const response = await fetch("http://localhost:3000/Equipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        acao: "AddAdministrador",
        data,
      }),
    });
    const result = await response.json();
    console.log(result);
  });

//Função para pegar as academias

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:3000/Equipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();

  for (i = 0; i < result.length; i++) {
    document.getElementById(
      "admAcademia"
    ).innerHTML += `<option value='${result[i].acaId}'>${result[i].acaNome}</option>`;
  }
});

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

//Cep automatico

async function cepAutomatico(cep) {
  const cepConsulta = cep.replace(/\D/g, "");

  try {
    const url = `https://viacep.com.br/ws/${cepConsulta}/json/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na consulta do CEP: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;
  } catch (error) {
    console.error("Falha na requisição", error);
    return null;
  }
}

//pegar data agora
function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Formato: YYYY-MM-DD HH:MM:SS
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}
