
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

  async ConnectIO() {
    const socket = io();

    socket.on('Atendimento', async (msg) => {
      // console.log(msg.data)
      if(msg.data.ateIdCliente = dados.cliId) {
        await UpdateStatusAtendimento(msg.idAcademia, msg.data.ateIdCliente, msg.data.dateNow)
      }
    });
  }
}