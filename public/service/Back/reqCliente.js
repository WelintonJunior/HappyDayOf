
class ClienteServices extends FichaServices {

  constructor() {
    super()
    this.login = new LoginServices();
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
      console.error("Erro ao Ler academia")
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

  async ReadStatusAtendimento(idAcademia, cliId, dateNow, token) {
    try {
      let data = { cliId, dateNow }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "ReadStatusAtendimento"
        })
      })
      const result = await response.json();
      return result
    } catch (err) {
      console.error("Erro ao ler status do atendimento");
      throw err
    }
  }

  async VerificarAtendimento(idAcademia, cliId, token) {
    try {
      let data = { cliId }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "VerificarAtendimento"
        })
      })
      const result = await response.json();
      return result
    } catch (err) {
      console.error("Erro ao ler atendimento");
      throw err
    }
  }

  async ReadAtendimentoInfo(ateId, token) {
    try {
      let data = { ateId }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "ReadAtendimentoInfo"
        })
      })
      const result = await response.json();
      return result
    } catch (err) {
      console.error("Erro ao ler atendimento");
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

  async UpdateSatisfacao(data, token) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateSatisfacao",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ReadDesempenho(data, token) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "ReadDesempenho",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Ler desempenho")
      throw err
    }
  }

  async RegisterMeta(data, idAcademia, token) {
    const response = await fetch("/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data,
        idAcademia,
        acao: "RegisterMeta"
      })
    })
    const result = await response.json();
    return result
  }

  async ReadMeta(cliId, token) {
    const response = await fetch("/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data: cliId,
        acao: "ReadMeta"
      })
    })
    const result = await response.json();
    return result[0]
  }

  async UpdateMeta(data, token) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          acao: "UpdateMeta",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ReadMetaAtual(data, idAcademia, token) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "ReadMetaAtual",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ConnectIO() {
    const socket = io();

    socket.on('Atendimento', async (msg) => {
      // console.log(msg.data)
      if (msg.data.ateIdCliente = dados.cliId) {
        await UpdateStatusAtendimento(msg.idAcademia, msg.data.ateIdCliente, msg.data.dateNow, token)
      }
    });

    socket.on("EncerrarAtendimento", async (msg) => {
      if (msg.data.ateIdCliente = dados.cliId) {
        const StatusSatisfacao = await clienteServices.VerificarAtendimento(idAcademia, msg.data.ateIdCliente, token)
        await VerificarSatisfacaoAtendimento(StatusSatisfacao, msg.data.dateNow, msg.idAcademia, msg.data.ateIdCliente, token)
      }
    })
  }
}


//Validação

const cliDetCelular = document.getElementById("cliDetCelular");
const cliDetCpf = document.getElementById("cliDetCpf");
const cliDetEmail = document.getElementById("cliDetEmail");
cliDetCelular.addEventListener("input", () => FormatarCelular(cliDetCelular));
cliDetCpf.addEventListener("input", () => HandleInputCpf(cliDetCpf));
cliDetCpf.addEventListener("blur", (e) => {
  const cliDetId = document.getElementById("cliDetId").value
  VerificarCpfCadastrado(e, e.target.value, cliDetId, "cli", token)
});
cliDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
cliDetEmail.addEventListener("blur", (e) => {
  const cliDetId = document.getElementById("cliDetId").value
  VerificarEmailCadastrado(e, e.target.value, cliDetId, "cli", token)
});