
class LoginServices {
  async handleLoginCliente(data) {
    try {
      const response = await fetch("/LoginCliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          senha: data.senha,
          DateNow: data.DateNow
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Fazer Login (Cliente)")
    }
  }

  async handleLoginFuncionario(data) {
    try {
      const response = await fetch("/LoginFuncionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          data,
        ),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Fazer Login (Funcionário)")
    }
  }

  async handleLogout() {
    localStorage.setItem("dados", "");
    window.location.href = "/";
  }

  async handleAcessoNegado() {
    alert("Acesso Negado");
    window.location.href = "/";
  }

  async VerificarEmailParaRecuperarSenha(Email, Modulo) {
    try {
      const response = await fetch("/VerificarEmailCadastradoGeral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email,
          Modulo
        })
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Fazer Login (Funcionário)")
    }
  }

  async EnviarEmail(Email, Modulo) {
    try {
      const response = await fetch("/EnviarEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email,
          Modulo
        })
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Fazer Login (Funcionário)")
    }
  }

  async VerificarCodigo(RecCodigo) {
    try {
      const response = await fetch("/VerificarCodigo", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body:
          parseInt(RecCodigo)

      })
      const result = await response.json()
      return result
    } catch (err) {
      console.error("Erro ao verificar código")
    }
  }

  async TrocarSenha(Senha, Email, Modulo) {
    try {
      const response = await fetch("/TrocarSenha", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Senha,
          Email,
          Modulo
        })
      })
      const result = await response.json()
      return result
    } catch (err) {
      console.error("Erro ao verificar código")
    }
  }

}
