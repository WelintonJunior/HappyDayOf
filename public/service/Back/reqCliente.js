
class ClienteServices extends FichaServices {

  constructor() {
    super()
    this.login = new LoginServices();
  }

  async ReadAcademia(idAcademia) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async ReadFuncionarioDetalhes(idAcademia, funId) {
    try {

      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async ReadClienteDetalhes(idAcademia, cliId) {
    try {

      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async ReadStatusAtendimento(idAcademia, cliId, dateNow) {
    try {
      let data = { cliId, dateNow }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async VerificarAtendimento(idAcademia, cliId) {
    try {
      let data = { cliId }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async ReadAtendimentoInfo(ateId) {
    try {
      let data = { ateId }
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async UpdateClienteDetalhes(data) {
    try {
      const response = await fetch("/Administrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async UpdateSatisfacao(data) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async ReadDesempenho(data) {
    try {
      const response = await fetch("/Cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  async RegisterMeta(data) {
    const response = await fetch("/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
        acao: "RegisterMeta"
      })
    })
    const result = await response.json();
    return result
  }

  async ReadMeta(cliId) {
    const response = await fetch("/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: cliId,
        acao: "ReadMeta"
      })
    })
    const result = await response.json();
    return result[0]
  }

  async UpdateMetaAnteriores(cliId) {
    const response = await fetch("/Cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: cliId,
        acao: "UpdateMetaAnteriores"
      })
    })
    const result = await response.json();
    return result
  }

  async ConnectIO() {
    const socket = io();

    socket.on('Atendimento', async (msg) => {
      // console.log(msg.data)
      if (msg.data.ateIdCliente = dados.cliId) {
        await UpdateStatusAtendimento(msg.idAcademia, msg.data.ateIdCliente, msg.data.dateNow)
      }
    });

    socket.on("EncerrarAtendimento", async (msg) => {
      if (msg.data.ateIdCliente = dados.cliId) {
        const StatusSatisfacao = await clienteServices.VerificarAtendimento(idAcademia, msg.data.ateIdCliente)
        await VerificarSatisfacaoAtendimento(StatusSatisfacao, msg.data.dateNow, msg.idAcademia, msg.data.ateIdCliente)
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
  VerificarCpfCadastrado(e, e.target.value, cliDetId, "cli")
});
cliDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
cliDetEmail.addEventListener("blur", (e) => {
  const cliDetId = document.getElementById("cliDetId").value
  VerificarEmailCadastrado(e, e.target.value, cliDetId, "cli")
});