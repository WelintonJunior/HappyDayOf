class AdministradorServices extends FichaServices {

  constructor() {
    super()
    this.login = new LoginServices();
  }

  //Read
  async ReadPlanos(idAcademia, token) {
    try {
      const response = await fetch("/Plano/ReadPlanos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          PlaIdAcad: parseInt(idAcademia),
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
      const response = await fetch("/Funcionario/ReadFuncionarioDet", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FunId: parseInt(funId),
          FunIdAcad: parseInt(idAcademia),
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
      const response = await fetch("/Cliente/ReadClienteDet", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(cliId),
          CliIdAcad: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os detalhes do cliente")
      throw err
    }
  }

  async ReadAparelhoDetalhes(idAcademia, apaId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: apaId,
          idAcademia,
          acao: "ReadAparelhoDet",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os detalhes do cliente")
      throw err
    }
  }

  async ReadExercicioDetalhes(idAcademia, exeId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: exeId,
          idAcademia,
          acao: "ReadExericioDet",
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
      const response = await fetch("/Academia/ReadAcademiaDet", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AcaId: parseInt(idAcademia),
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
      const response = await fetch("/Cliente/ReadClientes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliIdAcad: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler o cliente")
      throw err
    }
  }

  async ReadAparelho(idAcademia, token) {
    try {
      const response = await fetch("/Aparelho/ReadAparelhos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          ApaId: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ler os aparelhos")
      throw err
    }
  }

  async ReadExercicio(idAcademia, token) {
    try {
      const response = await fetch("/Exercicio/ReadExercicios", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          ExeIdAcad: idAcademia,
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
      const response = await fetch("/Funcionario/ReadFuncionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FunNivel: parseInt(nivel),
          FunIdAcad: parseInt(idAcademia),
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

  async RegisterAparelho(data, idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterAparelho",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao registrar o funcionario")
      throw err
    }
  }

  async RegisterExercicio(data, idAcademia, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterExercicio",
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
      const response = await fetch("/Cliente/ArchiveCliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(idCliente),
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

  async ArchiveAparelho(apaId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: apaId,
          acao: "ArchiveAparelho",
        }),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao arquivar o funcionario")
      throw err
    }
  }

  async ArchiveExercicio(exeId, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data: exeId,
          acao: "ArchiveExercicio",
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
    console.log(data)
    try {
      const response = await fetch("/Funcionario/UpdateFuncionarioDetalhes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FunId: parseInt(data.funId),
          FunNome: data.FunNome,
          FunCelular: data.FunCelular,
          FunCep: data.FunCep,
          FunCidade: data.FunCidade,
          FunEstado: data.FunEstado,
          FunRua: data.FunRua,
          FunNumeroRua: parseInt(data.FunNumeroRua),
          FunSexo: data.FunSexo,
          FunCpf: data.FunCpf,
          FunEmail: data.FunEmail,
          FunDataCmc: data.FunDataCmc,
          FunStatus: parseInt(data.FunStatus),
          FunNivel: parseInt(data.FunNivel)
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
      const response = await fetch("/Cliente/UpdateClienteDetalhes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(data.CliId),
          CliCelular: data.CliCelular,
          CliCep: data.CliCep,
          CliCidade: data.CliCidade,
          CliCpf: data.CliCpf,
          CliDataCmc: data.CliDataCmc,
          CliEmail: data.CliEmail,
          CliEstado: data.CliEstado,
          CliNome: data.CliNome,
          CliNumeroRua: parseInt(data.CliNumeroRua),
          CliPlano: parseInt(data.CliPlano),
          CliRua: data.CliRua,
          CliSexo: data.CliSexo,
          CliStatus: parseInt(data.CliStatus),
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async UpdateAparelhoDetalhes(data, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateAparelhoDetalhes",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async UpdateExercicioDetalhes(data, token) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateExercicioDetalhes",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async AtivarCliente(data, token) {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data,
        acao: "AtivarCliente"
      })
    })
    const result = await response.json();
    return result
  }

  async AtivarFuncionario(data, token) {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data,
        acao: "AtivarFuncionario"
      })
    })
    const result = await response.json();
    return result
  }

  async AtivarAparelho(data, token) {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data,
        acao: "AtivarAparelho"
      })
    })
    const result = await response.json();
    return result
  }

  async AtivarExercicio(data, token) {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data,
        acao: "AtivarExercicio"
      })
    })
    const result = await response.json();
    return result
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

