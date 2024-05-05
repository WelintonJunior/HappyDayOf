class EquipeServices extends LoginServices {


  async VerificarSessao(token) {
    const response = await fetch("/Ficha", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
    })
    const result = await response.json();
    if (result.message === "Token de autorização ausente" || "Sessão expirada, faça login novamente") {
      return "Sessão expirada faça login novamente"
    } else {
      return ""
    }
  }

  async AddAdministrador(data, token) {
    try {
      const response = await fetch("/Academia/AddAdministrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AdmNome: data.admNome,
          AdmCelular: data.admCelular,
          AdmCep: data.admCep,
          AdmCidade: data.admCidade,
          AdmEstado: data.admEstado,
          AdmRua: data.admRua,
          AdmNumeroRua: parseInt(data.admNumeroRua),
          AdmSexo: data.admSexo,
          AdmCpf: data.admCpf,
          AdmEmail: data.admEmail,
          AdmDataCmc: data.admDataCmc,
          AdmStatus: parseInt(data.admStatus),
          AdmIdAcad: parseInt(data.admAcademia),
          AdmSenha: data.admSenha
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao adicionar administrador")
      throw err
    }
  }

  async CreateAcademia(data, token) {
    console.log(data)
    try {
      const response = await fetch("/Academia/CreateAcademia", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AcaCnpj: data.acaCnpj,
          AcaNome: data.acaNome,
          AcaDataCadastro: data.acaDataCadastro,
          AcaCelular: data.acaCelular,
          AcaCep: data.acaCep,
          AcaCor: data.acaColor,
          AcaTelefone: data.acaTelefone
        }),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao criar academia")
      throw err
    }
  }

  async ReadAcademiaLista(token) {
    try {
      const response = await fetch("/Academia/ReadAcademiaLista", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      });
      const dados = await response.json();

      document.getElementById("table").innerHTML = "";

      const tabela = document.createElement("table");
      tabela.setAttribute("border", "1");

      const cabecalho = tabela.createTHead();
      const linhaCabecalho = cabecalho.insertRow();
      const titulos = ["Nome", "Data Cadastro", "Status", "Celular"];
      titulos.forEach((texto) => {
        let th = document.createElement("th");
        th.textContent = texto;
        linhaCabecalho.appendChild(th);
      });

      const corpoTabela = tabela.appendChild(document.createElement("tbody"));

      const keys = ["AcaNome", "AcaDataCadastro", "AcaStatus", "AcaCelular"];
      dados ? dados.forEach((item) => {
        const linha = corpoTabela.insertRow();
        keys.forEach((key) => {
          let celula = linha.insertCell();
          celula.textContent = item[key];
        });
      }) : {
      }

      document.getElementById("table").appendChild(tabela);
    } catch (err) {
      console.error("Erro ao carregar tabela");
      throw err;
    }
  }


  async InsertAcademiaToTheOptions(token) {
    try {
      let admAcademia = document.getElementById("admAcademia");
      const response = await fetch("/Academia/InsertAcademiaToTheOptions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      });
      const result = await response.json();
      console.log(result)
      admAcademia.innerHTML = "";
      admAcademia.innerHTML += `<option value='${result.AcaId}'></option>`;
    } catch (err) {
      console.error("Erro ao inserir academia a opção")
      throw err
    }
  }
}

//Validação

const admCpf = document.getElementById("admCpf");
const acaTelefone = document.getElementById("acaTelefone");
const acaCnpj = document.getElementById("acaCnpj");
const acaCelular = document.getElementById("acaCelular");
const admCelular = document.getElementById("admCelular");
const admEmail = document.getElementById("admEmail");
admCpf.addEventListener("input", () => HandleInputCpf(admCpf));
// admCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "fun", token));
admCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
acaCnpj.addEventListener("input", () => HandleInputCnpj(acaCnpj));
acaCnpj.addEventListener("blur", () => HandleBlurCnpj(acaCnpj));
acaTelefone.addEventListener("input", () => FormatarTelefone(acaTelefone));
acaCelular.addEventListener("input", () => FormatarCelular(acaCelular));
admCelular.addEventListener("input", () => FormatarCelular(admCelular));
// admEmail.addEventListener("blur", (e) => VerificarEmailCadastrado(e, e.target.value, "fun", token));

