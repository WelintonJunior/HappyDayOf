class AdministradorServices extends FichaServices {

  constructor() {
    super()
    this.login = new LoginServices();
  }

  //Read
  async ReadPlanos(idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          idAcademia,
          acao: "ReadPlanos",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os planos")
      throw err
    }
  }

  async ReadFuncionarioDetalhes(idAcademia, funId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: funId,
          idAcademia,
          acao: "ReadFuncionarioDet",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os detalhes do funcionario")
      throw err
    }
  }

  async ReadClienteDetalhes(idAcademia, cliId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: cliId,
          idAcademia,
          acao: "ReadClienteDet",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os detalhes do cliente")
      throw err
    }
  }

  async ReadAcademia(idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          idAcademia,
          acao: "ReadAcademia",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler as academias")
      throw err
    }
  }

  async ReadCliente(idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          idAcademia,
          acao: "ReadClientes",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler o cliente")
      throw err
    }
  }

  async ReadFuncionario(nivel, idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: nivel,
          idAcademia,
          acao: "ReadFuncionarios",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler o Funcionario")
      throw err
    }
  }

  //REGISTER

  async RegisterCliente(data, idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterCliente",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao registrar o cliente")
      throw err
    }
  }

  async RegisterFuncionario(data, idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterFuncionario",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao registrar o funcionario")
      throw err
    }
  }



  //ARCHIVE

  async ArchiveCliente(idCliente, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: idCliente,
          acao: "ArchiveCliente",
        }),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao arquivar o cliente")
      throw err
    }
  }

  async ArchiveFuncionario(idFuncionario, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: idFuncionario,
          acao: "ArchiveFuncionario",
        }),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao arquivar o funcionario")
      throw err
    }
  }

  //UPDATE

  async UpdateFuncionarioDetalhes(data, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateFuncionarioDetalhes",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do funcionario")
      throw err
    }
  }

  async UpdateClienteDetalhes(data, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateClienteDetalhes",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }
}


//Validação

const cliCelular = document.getElementById("cliCelular");
const funCelular = document.getElementById("funCelular");
const cliDetCelular = document.getElementById("cliDetCelular");
const funDetCelular = document.getElementById("funDetCelular");
const funDetCpf = document.getElementById("funDetCpf");
const cliDetCpf = document.getElementById("cliDetCpf");
const cliCpf = document.getElementById("cliCpf");
const funCpf = document.getElementById("funCpf");
const cliEmail = document.getElementById("cliEmail");
const cliDetEmail = document.getElementById("cliDetEmail");
const funEmail = document.getElementById("funEmail");
const funDetEmail = document.getElementById("funDetEmail");
if (funCelular) {
  funCelular.addEventListener("input", () => FormatarCelular(funCelular));
  funDetCelular.addEventListener("input", () => FormatarCelular(funDetCelular));
  funDetCpf.addEventListener("input", () => HandleInputCpf(funDetCpf));
  funDetCpf.addEventListener("blur", (e) => {
    const funDetId = document.getElementById("funDetId").value
    VerificarCpfCadastrado(e, e.target.value, funDetId, "fun", token)
  });
  funDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
  funCpf.addEventListener("input", () => HandleInputCpf(funCpf));
  funCpf.addEventListener("blur", (e) => VerificarCpfCadastradoGeral(e, e.target.value, "fun", token));
  funCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
  funEmail.addEventListener("blur", (e) => VerificarEmailCadastradoGeral(e, e.target.value, "fun", token));
  funDetEmail.addEventListener("blur", (e) => VerificarEmailCadastrado(e, e.target.value, "fun", token));

}
cliCelular.addEventListener("input", () => FormatarCelular(cliCelular));
cliDetCelular.addEventListener("input", () => FormatarCelular(cliDetCelular));
cliDetCpf.addEventListener("input", () => HandleInputCpf(cliDetCpf));
cliDetCpf.addEventListener("blur", (e) => {
  const cliDetId = document.getElementById("cliDetId").value
  VerificarCpfCadastrado(e, e.target.value, cliDetId, "cli", token)
});
cliDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
cliCpf.addEventListener("input", () => HandleInputCpf(cliCpf));
cliCpf.addEventListener("blur", (e) => VerificarCpfCadastradoGeral(e, e.target.value, "cli", token));
cliCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
cliEmail.addEventListener("blur", (e) => VerificarEmailCadastradoGeral(e, e.target.value, "cli", token));
cliDetEmail.addEventListener("blur", (e) => VerificarEmailCadastrado(e, e.target.value, "cli", token));

