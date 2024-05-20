
class ClienteServices extends FichaServices {

  constructor() {
    super()
    this.login = new LoginServices();
  }

  async ReadAcademia(AcaId, token) {
    try {
      const response = await fetch("/Academia/ReadAcademiaDet/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AcaId: parseInt(AcaId)
        }
        ),
      });
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result;
    } catch (err) {
      console.error("Erro ao Ler academia")
      throw err
    }
  }

  async ReadFuncionarioDetalhes(idAcademia, funId, token) {
    try {

      const response = await fetch("/Funcionario/ReadFuncionarioDet/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FunId: parseInt(funId),
          FunIdAcad: parseInt(idAcademia),
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
      console.error("Erro ao ler os detalhes do funcionario")
      throw err
    }
  }

  async ReadClienteDetalhes(idAcademia, cliId, token) {
    try {

      const response = await fetch("/Cliente/ReadClienteDet/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(cliId),
          CliIdAcad: parseInt(idAcademia),
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
      console.error("Erro ao ler os detalhes do cliente")
      throw err
    }
  }

  async ReadStatusAtendimento(idAcademia, cliId, dateNow, token) {
    try {
      const response = await fetch("/Atendimento/ReadStatusAtendimento/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteIdCliente: parseInt(cliId),
          AteIdAcad: parseInt(idAcademia),
          AteDateInicio: dateNow
        })
      })
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result
    } catch (err) {
      console.error("Erro ao ler status do atendimento");
      throw err
    }
  }

  async VerificarAtendimento(idAcademia, cliId, token) {
    try {
      const response = await fetch("/Satisfacao/VerificarAtendimento/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          SatIdCliente: parseInt(cliId),
          SatIdAcademia: parseInt(idAcademia),
        })
      })
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result
    } catch (err) {
      console.error("Erro ao ler atendimento");
      throw err
    }
  }

  async ReadAtendimentoInfo(ateId, token) {
    try {
      const response = await fetch("/Atendimento/ReadAtendimentoInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          AteId: parseInt(ateId)
        })
      })
      const result = await response.json();
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result
    } catch (err) {
      console.error("Erro ao ler atendimento");
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
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result;
    } catch (err) {
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async UpdateSatisfacao(data, token) {
    try {
      const response = await fetch("/Satisfacao/UpdateSatisfacao/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          SatId: parseInt(data.satId),
          SatNotaConhecimento: parseInt(data.rating_conhecimento),
          SatNotaDisponibilidade: parseInt(data.rating_disponibilidade),
          SatNotaProatividade: parseInt(data.rating_proatividade),
          SatNotaSeguranca: parseInt(data.rating_seguranca),
          SatNotaClareza: parseInt(data.rating_clareza),
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
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ReadDesempenho(data, token) {
    try {
      const response = await fetch("/Desempenho/ReadDesempenho", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(data),
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
      console.error("Erro ao Ler desempenho")
      throw err
    }
  }

  async RegisterMeta(data, idAcademia, token) {
    const response = await fetch("/Meta/RegisterMeta", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        MetIdCliente: parseInt(data.cliId),
        MetIdExercicio: parseInt(data.ExeId),
        MetCarga: parseFloat(data.metCarga),
        MetDataCumprir: data.dataCumprir,
        MetIdAcad: parseInt(idAcademia),
      })
    })
    const result = await response.json();
    if (result.message === "Não autorizado") {
      alert("Sessão expirada faça login novamente!")
      localStorage.clear()
      window.location.href = "/"
    }
    return result
  }

  async ReadMetas(cliId, token) {
    const response = await fetch("/Meta/ReadMetas", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        MetIdCliente: parseInt(cliId),
      })
    })
    const result = await response.json();
    if (result.message === "Não autorizado") {
      alert("Sessão expirada faça login novamente!")
      localStorage.clear()
      window.location.href = "/"
    }
    return result
  }

  async UpdateMeta(data, token) {
    try {
      const response = await fetch("/Meta/UpdateMeta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          MetIdCliente: parseInt(data.cliId),
          MetDataCumprir: data.dataCumprir,
          MetId: parseInt(data.idMetaAtual),
          MetGordura: parseFloat(data.metaGordura),
          MetPeso: parseFloat(data.metaPeso)
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
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ReadMetaAtual(data, idAcademia, token) {
    try {
      const response = await fetch("/Meta/ReadMetaAtual", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          MetIdCliente: parseInt(data),
          MetIdAcad: parseInt(idAcademia),
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
      console.error("Erro ao atualizar os dados do cliente")
      throw err
    }
  }

  async ReadExerciciosForDesempenho(CliId, token) {
    try {
      const response = await fetch("/Desempenho/ReadExerciciosForDesempenho", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify(CliId)
      })
      const result = await response.json()
      if (result.message === "Não autorizado") {
        alert("Sessão expirada faça login novamente!")
        localStorage.clear()
        window.location.href = "/"
      }
      return result
    } catch (err) {
      console.error("Erro ao ler exercicios")
      throw err
    }
  }

  async ReadExerciciosFichaCliente(CliId, token) {
    const response = await fetch("/Desempenho/ReadExerciciosFichaCliente", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify(parseInt(CliId))
    })
    const result = await response.json()
    if (result.message === "Não autorizado") {
      alert("Sessão expirada faça login novamente!")
      localStorage.clear()
      window.location.href = "/"
    }
    return result
  }

  connectWebSocket() {
    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onopen = function (event) {
      console.log('WebSocket is connected.');
    };

    socket.onmessage = async function (event) {
      const message = JSON.parse(event.data);
      switch (message.event) {
        case "UpdateStatusAtendimento":
          if (message.AteIdCliente === dados.CliId) {
            UpdateStatusAtendimento(message.AteIdAcad, message.AteIdCliente, message.AteDateEncerramento);
          }
          break;
        case "EncerrarAtendimento":
          if (message.AteIdCliente === dados.CliId) {
            const statusSatisfacao = await clienteServices.VerificarAtendimento(message.AteIdAcad, message.AteIdCliente);
            VerificarSatisfacaoAtendimento(statusSatisfacao, message.AteDateEncerramento, message.AteIdAcad, message.AteIdCliente);
          }
          break;
        default:
          console.log("Evento não reconhecido:", message.event);
      }
    };

    socket.onclose = function (event) {
      console.log('WebSocket is closed now.');
    };

    socket.onerror = function (error) {
      console.error('WebSocket error observed:', error);
    };
  }

  // Chamada para conectar ao WebSocket


  // async ConnectIO() {
  //   const socket = io();

  //   socket.on('Atendimento', async (msg) => {
  //     if (msg.data.ateIdCliente = dados.cliId) {
  //       await UpdateStatusAtendimento(msg.idAcademia, msg.data.ateIdCliente, msg.data.dateNow, token)
  //     }
  //   });

  //   socket.on("EncerrarAtendimento", async (msg) => {
  //     if (msg.data.ateIdCliente = dados.cliId) {
  //       const StatusSatisfacao = await clienteServices.VerificarAtendimento(idAcademia, msg.data.ateIdCliente, token)
  //       await VerificarSatisfacaoAtendimento(StatusSatisfacao, msg.data.dateNow, msg.idAcademia, msg.data.ateIdCliente, token)
  //     }
  //   })

  //   socket.on("AttFicha", async (data) => {
  //     if (data.data.cliIdFicha == dados.cliId) {
  //       if (data.data.detTreino) {
  //         switch (data.data.detTreino) {
  //           case "A":
  //             UpdateClienteFichaTreinoA(data.data.cliIdFicha, token)
  //             break;
  //           case "B":
  //             UpdateClienteFichaTreinoB(data.data.cliIdFicha, token)
  //             break;
  //           case "C":
  //             UpdateClienteFichaTreinoC(data.data.cliIdFicha, token)
  //             break;
  //         }
  //       }
  //       if (data.data.detCampo) {
  //         UpdateClienteFichaTreinoA(data.data.cliIdFicha, token)
  //         UpdateClienteFichaTreinoB(data.data.cliIdFicha, token)
  //         UpdateClienteFichaTreinoC(data.data.cliIdFicha, token)
  //       }
  //     }

  //   });
  // }
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