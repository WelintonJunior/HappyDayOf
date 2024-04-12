
class LoginServices {
  async handleLoginCliente(data) {
    try {
      const response = await fetch("/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acao: "LoginCliente",
          data,
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
      const response = await fetch("/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acao: "LoginFuncionario",
          data,
        }),
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
}
