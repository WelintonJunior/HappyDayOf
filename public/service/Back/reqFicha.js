class FichaServices {

  async ReadClienteFicha(idAcademia) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idAcademia,
          acao: "ReadClienteFicha",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro as fichas dos clientes")
      throw err
    }
  }

  async ReadFichaDetalhes(cliId, tipo) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { cliId, tipo },
          acao: "ReadFichaDetalhes"
        })
      })
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ver os detalhes da ficha do cliente")
      throw err
    }
  }

  async ReadFichaDetalhesGeral(cliId) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: cliId,
          acao: "ReadFichaDetalhesGeral"
        })
      })
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ver os detalhes gerais da ficha do cliente")
      throw err
    }
  }

  async RegisterBaseFicha(idAcademia, data) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          idAcademia,
          acao: "RegisterFicha",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao registrar a base da ficha")
      throw err
    }
  }

  async RegisterDetalhesFicha(data) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          acao: "RegisterDetalhesFicha"
        })
      })
      const result = await response.json();
      return result
    }
    catch (err) {
      console.error("Erro ao registrar os detalhes da ficha")
      throw err
    }
  }

  async UpdateCampoFicha(data) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          acao: "UpdateCampoFicha",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao atualiza o campo da ficha")
      throw err
    }
  }

  async DeleteCampoFicha(data) {
    try {
      const response = await fetch("/Ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          acao: "DeleteCampoFicha",
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao Deletar o campo da ficha")
      throw err
    }
  }
}