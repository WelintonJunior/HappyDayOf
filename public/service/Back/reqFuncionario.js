class FuncionarioServices extends AdministradorServices {

  constructor() {
    super();
    this.login = new LoginServices();
  }

  async RegisterAtendimento(idAcademia, data, token) {
    try {
      const response = await fetch("/Atendimento/RegisterAtendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteIdCliente: parseInt(data.ateIdCliente),
          AteIdAcad: parseInt(idAcademia),
          AteIdFuncionario: parseInt(data.funId),
          AteDateInicio: data.dateNow
        }),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }

      return result;
    } catch (err) {
      console.error("Erro ao registrar atendimento")
      throw err
    }
  }
  async ReadAtendimento(idAcademia, data, token) {
    try {
      const response = await fetch("/Atendimento/ReadAtendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteIdAcad: parseInt(idAcademia),
          AteIdFuncionario: parseInt(data),
        }),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }

      return result;
    } catch (err) {
      console.error("Erro ao ler atendimento")
      throw err
    }
  }
  async ValidacaoAtendimento(idAcademia, data, token) {
    try {
      const response = await fetch("/Atendimento/ValidacaoAtendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteIdCliente: parseInt(data.ateIdCliente),
          AteIdFuncionario: parseInt(data.funId),
          AteIdAcad: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }

      return result;
    } catch (err) {
      console.error("Erro ao validar atendimento")
      throw err
    }
  }
  async UpdateStatusAtendimento(idAcademia, data, token) {
    try {
      const response = await fetch("/Atendimento/UpdateStatusAtendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteId: parseInt(data.ateId),
          AteIdCliente: parseInt(data.ateIdCliente),
          AteDateEncerramento: data.dateNow,
          AteIdAcad: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }

      return result;
    } catch (err) {
      console.error("Erro ao atualizar status do atendimento")
      throw err
    }
  }

  async FuncionarioMeuDesempenho(FunId) {
    try {
      const response = await fetch("/Funcionario/MeuDesempenho", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FunId: parseInt(FunId),
        }),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }

      return result;
    } catch (err) {
      console.error("Erro ao atualizar status do atendimento")
      throw err
    }
  }
}
