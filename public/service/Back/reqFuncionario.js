class FuncionarioServices extends AdministradorServices {
  
  constructor() {
    super();
    this.login = new LoginServices();
  }

  async RegisterAtendimento(idAcademia, data) {
    try {
      const response = await fetch("/Funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterAtendimento",
        }),
      });
      const result = await response.json();
      return result;
    } catch(err) {
      console.error("Erro ao registrar atendimento")
      throw err
    }
  }
  async ReadAtendimento(idAcademia, data) {
    try {
      const response = await fetch("/Funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "ReadAtendimento",
        }),
      });
      const result = await response.json();
      return result;
    } catch(err) {
      console.error("Erro ao ler atendimento")
      throw err
    }
  }  
  async ValidacaoAtendimento (idAcademia, data) {
    try {
      const response = await fetch("/Funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "ValidacaoAtendimento",
        }),
      });
      const result = await response.json();
      return result;
    } catch(err) {
      console.error("Erro ao validar atendimento")
      throw err
    }
  }
  async UpdateStatusAtendimento(idAcademia, data) {
    try {
      const response = await fetch("/Funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "UpdateStatusAtendimento",
        }),
      });
      const result = await response.json();
      return result;
    } catch(err) {
      console.error("Erro ao atualizar status do atendimento")
      throw err
    }
  }
  

}
